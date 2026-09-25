import { useState, type FormEvent } from "react";
import { readAttribution } from "@/lib/attribution";
import { OFFERS, type Offer } from "@/lib/offers";
import { isValidName, normalizeUaPhone } from "@/lib/phone";

type LeadResponse = {
  success?: boolean;
  error?: string;
};

function messageFor(code: string | undefined): string {
  if (code === "bad_name") return "Вкажіть ім’я — щонайменше 2 символи.";
  if (code === "bad_phone") return "Вкажіть мобільний номер України, наприклад 067 123 45 67.";
  if (code === "rate") return "Забагато спроб. Зачекайте кілька хвилин і спробуйте ще раз.";
  return "Не вдалося надіслати заявку. Спробуйте ще раз.";
}

function trackPixels(total: number, variant: string, phone: string) {
  const win = window as Window & {
    ttq?: {
      identify?: (payload: Record<string, string>) => void;
      track: (event: string, payload?: Record<string, unknown>) => void;
    };
    fbq?: (...args: unknown[]) => void;
  };
  const canonical = normalizeUaPhone(phone);
  try {
    if (canonical) win.ttq?.identify?.({ phone_number: `+${canonical}` });
    win.ttq?.track("SubmitForm", { value: total, currency: "UAH" });
  } catch {
    // піксель не має ламати форму
  }
  try {
    win.fbq?.("track", "Lead", {
      value: total,
      currency: "UAH",
      content_name: variant,
    });
  } catch {
    // піксель не має ламати форму
  }
}

export function OrderForm() {
  const [offer, setOffer] = useState<Offer>(OFFERS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || done) return;
    const cleanName = name.trim().replace(/\s+/g, " ");
    if (!isValidName(cleanName)) {
      setError(messageFor("bad_name"));
      return;
    }
    if (!normalizeUaPhone(phone)) {
      setError(messageFor("bad_phone"));
      return;
    }
    setError("");
    setPending(true);
    const attr = readAttribution();
    const payload = {
      name: cleanName,
      phone,
      quantity: offer.quantity,
      variant: offer.variant,
      total: offer.total,
      page: window.location.href,
      website,
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      utm_content: attr.utm_content,
      utm_term: attr.utm_term,
      fbclid: attr.fbclid,
      ttclid: attr.ttclid,
      gclid: attr.gclid,
    };
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as LeadResponse;
      if (data.success === true) {
        trackPixels(offer.total, offer.variant, phone);
        setDone(true);
        return;
      }
      setError(messageFor(data.error));
    } catch {
      setError(messageFor(undefined));
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="thanks" role="status">
        <h2>Дякуємо!</h2>
        <p>Заявку прийнято. Менеджер зателефонує, щоб уточнити доставку. Оплата — при отриманні.</p>
        <p className="thanks-order">
          {offer.variant}. До відправки: {offer.quantity} шт.
        </p>
      </div>
    );
  }

  return (
    <form id="order_form" className="form" onSubmit={onSubmit} noValidate>
      <input
        className="field"
        type="text"
        name="name"
        placeholder="Введіть Ваше ім'я"
        autoComplete="name"
        maxLength={80}
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <input
        className="field"
        type="tel"
        name="phone"
        placeholder="Введіть Ваш телефон"
        inputMode="tel"
        autoComplete="tel"
        maxLength={20}
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        required
      />
      <select
        className="field qty"
        name="quantity"
        required
        value={offer.quantity}
        onChange={(event) => {
          const next = OFFERS.find((item) => item.quantity === Number(event.target.value));
          if (next) setOffer(next);
        }}
      >
        {OFFERS.map((item) => (
          <option key={item.quantity} value={item.quantity}>
            {item.label}
          </option>
        ))}
      </select>
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Сайт</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <button className="button" type="submit" disabled={pending}>
        {pending ? "Надсилаємо…" : "Замовити зі знижкою"}
      </button>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
