import { OrderForm } from "@/components/order-form";

const SPECS = [
  ["Назва виробу:", "Sweet Home Collagen Night Wrapping Mask — нічна маска для обличчя."],
  ["Тип:", "незмивна нічна маска-кокон."],
  ["Призначення:", "менше висипань і запалень, звужені пори, рівний тон, зволоження."],
  ["Тип шкіри:", "проблемна, комбінована, жирна; підходить і для чутливої."],
  ["Активні компоненти:", "колаген, гіалуронова кислота, екстракт центели, ніацинамід, екстракт зеленого чаю."],
  ["Об’єм:", "100 мл."],
  ["Текстура:", "легкий гель-крем, швидко вбирається, не липне."],
  ["Застосування:", "ввечері, 3–4 рази на тиждень, без змивання."],
];

const REVIEWS = [
  {
    image: "/land/images/howto.jpg",
    text: "«Шкіра схильна до висипань на щоках, перепробувала купу засобів. Мажу маску на ніч — зранку запалення помітно менше, шкіра не пересушена. За місяць стало значно чистіше, тон рівніший.»",
    name: "Олена",
  },
];

const STEPS = [
  { n: "1", title: "Заявка", text: "Заповніть форму на сайті" },
  { n: "2", title: "Дзвінок", text: "Наш менеджер передзвонить для уточнення деталей" },
  { n: "3", title: "Відправка", text: "Доставляємо ваш товар протягом 1–3 днів" },
  { n: "4", title: "Отримання", text: "Оплачуєте при отриманні на Новій та Укрпошті" },
];

function Price() {
  return (
    <div className="price_block clearfix">
      <div className="price_item old">
        <div className="text">Звичайна ціна:</div>
        <div className="value">598 грн</div>
      </div>
      <div className="price_item new">
        <div className="text">
          <span>Економія від 50%</span>
        </div>
        <div className="value">299 грн</div>
      </div>
    </div>
  );
}

export function Landing() {
  return (
    <div className="land">
      <div className="main_wrapper">
        <header className="offer_section">
          <h1 className="title">Чиста шкіра без прищів — поки ти спиш</h1>
          <p className="lead">
            Нічна маска з колагеном, центелою та ніацинамідом. Менше запалень, рівний тон, зволожена шкіра.
          </p>
          <div className="image_block">
            <img
              className="offer_image"
              src="/land/images/hero.jpg"
              alt="Нічна маска Sweet Home Collagen Night Wrapping Mask"
            />
          </div>
          <Price />
          <a href="#order_form" className="button">
            Замовити зі знижкою
          </a>
          <p className="promo-dates">Акція −50 грн на другу одиницю діє з 25.09.2026 по 08.10.2026</p>
        </header>

        <section className="description_section">
          <h2 className="title">Нічна маска для проблемної шкіри</h2>
          <img className="offer_image" src="/land/images/demo.gif" alt="Нанесення нічної маски на шкіру" />
          <p className="copy">
            <b>Sweet Home Collagen Night Wrapping Mask — нічна маска-кокон проти висипань.</b>
            <br />
            Наноситься тонким шаром перед сном і працює всю ніч: заспокоює запалені прищі, звужує пори і не
            пересушує шкіру. Легка текстура не забиває пори та не залишає липкої плівки на подушці.
          </p>
        </section>

        <section className="description_section">
          <img
            className="offer_image"
            src="/land/images/before.jpg"
            alt="Висипання на щоках — запалені прищі, білі головки, чорні цятки, постакне"
          />
          <p className="copy">
            Маска створює на шкірі тонкий «кокон», під яким активні компоненти діють довше і глибше. Центела та
            зелений чай знімають почервоніння, ніацинамід вирівнює тон і контролює жирний блиск, а гіалуронова
            кислота і колаген зволожують та розгладжують рельєф — без відчуття стягнутої шкіри зранку.
          </p>
          <img className="offer_image" src="/land/images/story.jpg" alt="Шкіра до і після курсу нічної маски" />
          <p className="copy">
            <b>Спосіб використання:</b>
            <br />
            Ввечері очистіть обличчя. Нанесіть маску тонким рівним шаром на все обличчя або локально на зони
            висипань, уникаючи області навколо очей. Дайте вбратися 1–2 хвилини і лягайте спати — змивати не
            потрібно. Зранку вмийтеся теплою водою. Для помітного результату використовуйте 3–4 рази на тиждень
            протягом 3–4 тижнів.
          </p>
          <img
            className="offer_image"
            src="/land/images/care.jpg"
            alt="Склад маски — колаген, гіалуронова кислота, центела, ніацинамід, зелений чай"
          />
          <p className="copy">
            <b>Що всередині:</b>
            <br />
            Колаген — пружність і гладкий рельєф, менше слідів постакне. Гіалуронова кислота — глибоке
            зволоження. Екстракт центели — заспокоює запалення і прискорює відновлення. Ніацинамід — рівний тон,
            звужені пори, менше висипань. Екстракт зеленого чаю — антиоксидантний захист і менше жирного
            блиску.
          </p>
          <img
            className="offer_image plain"
            src="/land/images/bottle.jpg"
            alt="Тюбик Sweet Home Collagen Night Wrapping Mask, 100 мл"
          />

          <div className="set_section">
            <h2 className="spec-title">Характеристики</h2>
            <ul className="specs">
              {SPECS.map(([label, value]) => (
                <li key={label}>
                  <b>{label}</b> {value}
                </li>
              ))}
            </ul>
          </div>
          <a href="#order_form" className="button">
            Замовити зі знижкою
          </a>
        </section>

        <section className="otz">
          <h2 className="title">Відгуки покупців</h2>
          <div className="reviews_stats_block">
            <p>
              <b>Рейтинг:</b> 4.8/5
              {Array.from({ length: 5 }, (_, index) => (
                <img key={index} className="rating_img" src="/land/images/rating.png" alt="" />
              ))}
            </p>
            <p>
              <b>98%</b> покупців рекомендують цей товар
            </p>
          </div>
          {REVIEWS.map((review) => (
            <article key={review.name} className="review-slide">
              <img src={review.image} alt="" />
              <div className="review-content">
                <p className="review-text">{review.text}</p>
                <p className="customer-name">{review.name}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="steps">
          <h2 className="title">Як замовити?</h2>
          {STEPS.map((step) => (
            <div key={step.n} className="step">
              <span className="step-n">{step.n}</span>
              <div>
                <p className="step-title">{step.title}</p>
                <p className="step-text">{step.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="offer_section offer-bottom">
          <div className="image_block">
            <img className="offer_image" src="/land/images/hero.jpg" alt="" />
          </div>
          <Price />
          <OrderForm />
        </section>
      </div>
      <footer className="site-footer">
        <a href="/privacy">Політика конфіденційності</a>
      </footer>
    </div>
  );
}
