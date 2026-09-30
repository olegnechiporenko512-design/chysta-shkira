import { useState, type FormEvent } from "react";
import { readAttribution } from "@/lib/attribution";
import { OFFERS, type Offer } from "@/lib/offers";
import { formatUaPhone, isValidName, normalizeUaPhone } from "@/lib/phone";

type LeadResponse = {
  success?: boolean;
  order_id?: string;
  error?: string;
};

function messageFor(code: string | undefined): string {
  if (code === "bad_name") return "Вкажіть ім’я — щонайменше 2 символи.";
  if (code === "bad_phone") return "Перевірте номер — має бути 9 цифр після +380.";
  if (code === "rate") return "Забагато спроб. Зачекайте кілька хвилин і спробуйте ще раз.";
  return "Не вдалося відправити, спробуйте ще раз";
}

const PRODUCT_NAME = "Sweet Home Collagen Night Mask";

function readCookie(name: string): string {
  const prefix = `${name}=`;
  for (const part of document.cookie.split(";")) {
    const item = part.trim();
    if (item.startsWith(prefix)) return decodeURIComponent(item.slice(prefix.length));
  }
  return "";
}

export function OrderForm() {
  const [offer, setOffer] = useState<Offer>(OFFERS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+380 ");
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
      phone: normalizeUaPhone(phone) ?? phone,
      quantity: offer.quantity,
      variant: offer.variant,
      total: offer.total,
      page: window.location.href,
      fbp: readCookie("_fbp"),
      fbc: readCookie("_fbc"),
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
    let leave = false;
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as LeadResponse;
      if (data.success === true && data.order_id) {
        const canonical = normalizeUaPhone(phone) ?? "";
        try {
          sessionStorage.setItem(
            "dyakuiemo_order",
            JSON.stringify({
              order_id: data.order_id,
              name: cleanName,
              phone: canonical,
              variant: offer.variant,
              quantity: offer.quantity,
              total: offer.total,
              product: PRODUCT_NAME,
            }),
          );
        } catch {
          /* storage blocked */
        }
        leave = true;
        window.location.assign("/dyakuiemo");
        return;
      }
      if (data.success === true) {
        leave = true;
        window.location.assign("/dyakuiemo");
        return;
      }
      setError(messageFor(data.error));
    } catch {
      setError(messageFor(undefined));
    } finally {
      if (!leave) setPending(false);
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
        placeholder="+380 67 123 45 67"
        inputMode="tel"
        autoComplete="tel"
        maxLength={20}
        value={phone}
        onChange={(event) => setPhone(formatUaPhone(event.target.value))}
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
