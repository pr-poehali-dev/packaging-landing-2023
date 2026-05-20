import React, { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type AnyIcon = string;

const HERO_IMAGE = "https://cdn.poehali.dev/projects/10bd6f4a-1016-49d2-98a0-b68c65f90cfa/files/6cab639f-4145-42ae-bfc1-d786bd55a15d.jpg";

function useCountUp(target: number, duration: number = 1500, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const NAV_LINKS = [
  { label: "Преимущества", href: "#advantages" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Кейсы", href: "#cases" },
  { label: "Процесс", href: "#process" },
  { label: "Контакты", href: "#contacts" },
];

const ADVANTAGES = [
  { icon: "Factory", title: "Своё производство и доставка", text: "Не платите за аренду склада и логистику сторонних перевозчиков — у нас всё своё." },
  { icon: "ScanLine", title: "Контроль каждого листа", text: "Технолог на линии проверяет плотность, склейку и совпадение цвета с макетом." },
  { icon: "PackageCheck", title: "Запас 2% в тираже", text: "Даже если 2% ушло в брак при печати — вы получаете полный заказ без доплат." },
  { icon: "TestTube", title: "Тестовый тираж бесплатно", text: "Напечатаем до 50 штук вашей упаковки, чтобы вы утвердили качество до основного заказа." },
];

const PORTFOLIO_ITEMS = [
  { emoji: "🍔", title: "Коробки для бургеров и сэндвичей", desc: "Однокомпонентные, с окном или без. Любой размер и дизайн." },
  { emoji: "🛍️", title: "Крафтовые пакеты с логотипом", desc: "Плоские и с дном, выдерживают до 10 кг. 100% брендирование." },
  { emoji: "🥡", title: "Пакеты для навынос", desc: "Бумажные, с кручёными ручками. Классика и премиум-серия." },
  { emoji: "🥗", title: "Контейнеры для еды", desc: "Для супов, салатов, горячих блюд. С ламинацией внутри." },
  { emoji: "❄️", title: "Упаковка для заморозки", desc: "С ламинацией, выдерживает перепады температур." },
  { emoji: "📦", title: "Гофрокороба малых тиражей", desc: "От 1000 шт. — под заказ. Уточняйте у менеджера.", badge: "Под заказ" },
];

const PROCESS_STEPS = [
  { num: "01", icon: "PhoneCall", title: "Заявка", text: "Оставляете заявку → технолог перезванивает через 30 минут (будни 9–18)." },
  { num: "02", icon: "ClipboardList", title: "Обсуждение", text: "Тип упаковки, тираж от 5000, материал, наличие макета. Всё в одном звонке." },
  { num: "03", icon: "FlaskConical", title: "Тестовый тираж", text: "До 50 штук бесплатно — проверяете склейку, запах, прочность." },
  { num: "04", icon: "Printer", title: "Производство", text: "Запускаем основной тираж. Контроль качества на всех этапах." },
  { num: "05", icon: "Truck", title: "Доставка", text: "Своим транспортом в день готовности. Без сторонних перевозчиков." },
];

const REVIEWS = [
  { name: "Алексей К.", role: "Владелец сети фастфуда, 12 точек", text: "Заказывали 30 000 крафт-пакетов под запуск меню. Уложились в 4 дня, качество отличное. Будем работать постоянно.", stars: 5 },
  { name: "Марина В.", role: "Директор по маркетингу, кофейня", text: "Цветопроба за 0 ₽ — это реально работает. Подобрали точный цвет под фирменный стиль с первого раза.", stars: 5 },
  { name: "Дмитрий Р.", role: "Служба доставки суши", text: "Конкуренты брали в 3 раза дороже. Здесь дали скидку 15%, срок 5 дней и ещё бесплатный тестовый тираж.", stars: 5 },
];

const FAQS = [
  { q: "Какой минимальный тираж?", a: "От 5 000 экземпляров. Для гофрокороб — от 1 000 шт. (уточняйте)." },
  { q: "Сколько стоит цветопроба?", a: "Цветопроба — бесплатно. Вы утверждаете цвет до запуска тиража." },
  { q: "Какой срок производства?", a: "Стандартный срок — 5 дней. При срочном заказе уточняйте у менеджера." },
  { q: "Нужен ли готовый макет?", a: "Нет. Наш дизайнер поможет разработать макет. Это услуга, стоимость уточняется." },
  { q: "Как происходит доставка?", a: "Доставляем собственным транспортом в Москве и МО. Для других регионов — согласовывается отдельно." },
  { q: "Можно ли посмотреть образцы материалов?", a: "Да! Заполните форму — привезём образцы на адрес вашего офиса бесплатно." },
];

function QuizModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { q: "Какой тип упаковки вам нужен?", options: ["Коробки для бургеров/сэндвичей", "Крафтовые пакеты", "Контейнеры для еды", "Упаковка для заморозки", "Другое"], key: "type" },
    { q: "Какой тираж вы планируете?", options: ["5 000 – 20 000 шт.", "20 000 – 100 000 шт.", "Более 100 000 шт.", "Пока не знаю"], key: "volume" },
    { q: "Есть ли у вас готовый макет?", options: ["Да, есть макет", "Нет, нужна разработка", "Только идея"], key: "design" },
  ];

  const handleOption = (val: string) => {
    const newAnswers = { ...answers, [steps[step].key]: val };
    setAnswers(newAnswers);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }}>
      <div className="relative w-full max-w-lg rounded-2xl p-8" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <Icon name="X" size={22} />
        </button>
        {!submitted ? (
          <>
            <div className="mb-2 text-sm font-medium" style={{ color: "var(--c-accent)" }}>Шаг {step + 1} из {steps.length}</div>
            <div className="w-full h-1 rounded-full mb-6" style={{ background: "var(--c-border)" }}>
              <div className="h-1 rounded-full transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%`, background: "var(--c-accent)" }} />
            </div>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>{steps[step].q}</h3>
            <div className="flex flex-col gap-3">
              {steps[step].options.map((opt) => (
                <button key={opt} onClick={() => handleOption(opt)}
                  className="text-left px-5 py-3 rounded-xl font-medium transition-all hover:scale-[1.02]"
                  style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-accent)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border)"; }}>
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Отлично!</h3>
            <p className="mb-6" style={{ color: "var(--c-muted)" }}>Ваш запрос принят. Технолог перезвонит в течение 30 минут.</p>
            <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 rounded-xl mb-4 text-center"
              style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }} />
            <button onClick={onClose} className="w-full py-3 rounded-xl font-bold text-black transition-opacity hover:opacity-90"
              style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", fontSize: "1rem", letterSpacing: "0.05em" }}>
              ОТПРАВИТЬ ЗАЯВКУ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SamplesModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }}>
      <div className="relative w-full max-w-lg rounded-2xl p-8" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <Icon name="X" size={22} />
        </button>
        {!sent ? (
          <>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Получить образцы материалов</h3>
            <p className="mb-6 text-sm" style={{ color: "var(--c-muted)" }}>Доставим образцы картона, покрытий и готовых изделий прямо к вам в офис — бесплатно.</p>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Ваше имя" className="px-4 py-3 rounded-xl outline-none"
                style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }} />
              <input type="tel" placeholder="+7 (___) ___-__-__" className="px-4 py-3 rounded-xl outline-none"
                style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }} />
              <input type="text" placeholder="Адрес доставки образцов" className="px-4 py-3 rounded-xl outline-none"
                style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }} />
            </div>
            <button onClick={() => setSent(true)} className="w-full mt-5 py-3 rounded-xl font-bold text-black transition-opacity hover:opacity-90"
              style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", fontSize: "1rem", letterSpacing: "0.05em" }}>
              ЗАКАЗАТЬ ОБРАЗЦЫ
            </button>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Заявка принята!</h3>
            <p style={{ color: "var(--c-muted)" }}>Менеджер свяжется с вами и согласует удобное время доставки образцов.</p>
            <button onClick={onClose} className="mt-6 px-8 py-3 rounded-xl font-bold text-black"
              style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif" }}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [samplesOpen, setSamplesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const statsRef = useInView();
  const c1 = useCountUp(5000, 1200, statsRef.inView);
  const c2 = useCountUp(15, 1000, statsRef.inView);
  const c3 = useCountUp(5, 800, statsRef.inView);
  const c4 = useCountUp(200, 1400, statsRef.inView);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "Golos Text, sans-serif", background: "var(--c-bg)", color: "var(--c-text)", overflowX: "hidden" }}>
      {quizOpen && <QuizModal onClose={() => setQuizOpen(false)} />}
      {samplesOpen && <SamplesModal onClose={() => setSamplesOpen(false)} />}

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{ background: scrolled ? "rgba(14,14,16,0.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid var(--c-border)" : "none" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="font-bold text-xl tracking-wider" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-accent)" }}>
            КАРТОН<span style={{ color: "var(--c-text)" }}>ПАК</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: "var(--c-muted)" }}>{l.label}</a>
            ))}
          </div>
          <button onClick={() => setQuizOpen(true)} className="hidden md:block px-5 py-2 rounded-lg font-bold text-black text-sm transition-opacity hover:opacity-90"
            style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
            РАССЧИТАТЬ СТОИМОСТЬ
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2" style={{ color: "var(--c-text)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3" style={{ background: "rgba(14,14,16,0.98)" }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium border-b"
                style={{ color: "var(--c-muted)", borderColor: "var(--c-border)" }}>{l.label}</a>
            ))}
            <button onClick={() => { setQuizOpen(true); setMenuOpen(false); }} className="mt-2 py-3 rounded-lg font-bold text-black"
              style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif" }}>РАССЧИТАТЬ СТОИМОСТЬ</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16" id="hero">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Упаковка для фастфуда" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(14,14,16,0.95) 45%, rgba(14,14,16,0.5) 100%)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, rgba(255,107,0,0.15) 0%, transparent 60%)" }} />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute opacity-[0.05]"
              style={{ top: `${10 + i * 18}%`, left: "-10%", right: "-10%", height: "1px",
                background: "linear-gradient(90deg, transparent, var(--c-accent), transparent)",
                animation: `scanline ${3 + i * 0.7}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.3)", color: "var(--c-accent)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--c-accent)" }} />
              Собственное производство · Москва
            </div>

            <h1 className="font-black leading-none mb-6"
              style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.01em", color: "var(--c-text)" }}>
              УПАКОВКА ДЛЯ<br />
              <span style={{ color: "var(--c-accent)" }}>ФАСТФУДА</span> И<br />
              ПРОДУКТОВ
            </h1>

            <p className="text-lg mb-4 font-medium" style={{ color: "var(--c-muted)", maxWidth: "520px", lineHeight: 1.6 }}>
              С печатью логотипа <strong style={{ color: "var(--c-text)" }}>от 5 000 шт.</strong> в Москве —
              срок <strong style={{ color: "var(--c-text)" }}>5 дней</strong>, доставка своя.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {["Цветопроба за 0 ₽", "На 15% ниже рынка", "Тестовый тираж бесплатно"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--c-border)", color: "var(--c-muted)" }}>{tag}</span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setQuizOpen(true)}
                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-black transition-all hover:scale-[1.02]"
                style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em", boxShadow: "0 0 40px rgba(255,107,0,0.3)" }}>
                <Icon name="Calculator" size={20} />
                РАССЧИТАТЬ СТОИМОСТЬ ЗА 2 МИНУТЫ
                <Icon name="ArrowRight" size={18} />
              </button>
              <button onClick={() => setSamplesOpen(true)}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02]"
                style={{ background: "transparent", border: "2px solid var(--c-border)", color: "var(--c-text)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border)"; }}>
                <Icon name="Package" size={20} />
                ПОЛУЧИТЬ ОБРАЗЦЫ
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs" style={{ color: "var(--c-muted)" }}>прокрутите вниз</span>
          <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1" style={{ border: "1.5px solid var(--c-muted)" }}>
            <div className="w-1 h-2 rounded-full" style={{ background: "var(--c-muted)", animation: "scrollDot 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef.ref} style={{ background: "var(--c-accent)", padding: "3rem 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: c1, suffix: " шт.", label: "минимальный тираж" },
              { val: c2, suffix: "%", label: "ниже рынка" },
              { val: c3, suffix: " дней", label: "срок производства" },
              { val: c4, suffix: "+", label: "выполненных заказов" },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-black text-4xl md:text-5xl text-black mb-1" style={{ fontFamily: "Oswald, sans-serif" }}>
                  {s.val.toLocaleString("ru")}{s.suffix}
                </div>
                <div className="text-sm font-medium text-black opacity-70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24" style={{ background: "var(--c-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>ПОЧЕМУ МЫ</div>
            <h2 className="font-black" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              ГАРАНТИИ,<br /><span style={{ color: "var(--c-accent)" }}>КОТОРЫЕ РАБОТАЮТ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {ADVANTAGES.map((a, i) => (
              <div key={i} className="p-8 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--c-accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--c-border)"; }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(255,107,0,0.12)" }}>
                  <Icon name={a.icon as AnyIcon} size={24} fallback="Star" />
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>{a.title}</h3>
                <p style={{ color: "var(--c-muted)", lineHeight: 1.7 }}>{a.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
            style={{ background: "linear-gradient(135deg, var(--c-surface) 0%, rgba(255,107,0,0.06) 100%)", border: "1px solid var(--c-border)" }}>
            <div className="flex-shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center text-5xl"
              style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.2)" }}>🏆</div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-xs font-bold tracking-widest mb-2" style={{ color: "var(--c-accent)" }}>ЭЛЕМЕНТ ДОВЕРИЯ</div>
              <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Благодарность от «Доширак»</h3>
              <p style={{ color: "var(--c-muted)" }}>Наша работа подтверждена официальными грамотами от крупных клиентов. Запросите список — пришлём без логотипов, с подтверждением факта.</p>
            </div>
            <button className="flex-shrink-0 px-7 py-3 rounded-xl font-bold text-black transition-opacity hover:opacity-90"
              style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
              ЗАПРОСИТЬ СПИСОК КЛИЕНТОВ
            </button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24" style={{ background: "var(--c-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>ЧТО МЫ ДЕЛАЕМ</div>
            <h2 className="font-black mb-4" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              ВИДЫ <span style={{ color: "var(--c-accent)" }}>УПАКОВКИ</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div key={i} className="relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--c-accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--c-border)"; }}>
                {item.badge && (
                  <span className="absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-bold"
                    style={{ background: "rgba(255,107,0,0.15)", color: "var(--c-accent)", border: "1px solid rgba(255,107,0,0.3)" }}>
                    {item.badge}
                  </span>
                )}
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>{item.title}</h3>
                <p className="text-sm" style={{ color: "var(--c-muted)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => setQuizOpen(true)}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-black transition-all hover:scale-[1.02]"
              style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", fontSize: "1rem", letterSpacing: "0.05em" }}>
              <Icon name="Search" size={20} />
              ПОДОБРАТЬ УПАКОВКУ ПОД ВАШ ПРОДУКТ
            </button>
          </div>
        </div>
      </section>

      {/* CASE */}
      <section id="cases" className="py-24" style={{ background: "var(--c-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>РЕАЛЬНЫЙ КЕЙС</div>
            <h2 className="font-black" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              КАК МЫ НАПЕЧАТАЛИ<br /><span style={{ color: "var(--c-accent)" }}>50 000 ПАКЕТОВ ЗА 4 ДНЯ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="mb-8 p-6 rounded-2xl" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                <div className="text-sm font-semibold mb-1" style={{ color: "var(--c-accent)" }}>Задача клиента</div>
                <p style={{ color: "var(--c-muted)", lineHeight: 1.7 }}>
                  Сеть фастфуда запускала акцию «Двойной бургер». Нужно было <strong style={{ color: "var(--c-text)" }}>50 000 крафт-пакетов</strong> с ярким дизайном и плотностью бумаги 120 г/м². Срок — 4 дня.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "За 1 день утвердили цветопробу",
                  "Печатали на двух линиях одновременно",
                  "Своя доставка к утру пятого дня",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={20} fallback="Check" style={{ color: "var(--c-accent)", marginTop: "2px", flexShrink: 0 } as React.CSSProperties} />
                    <span style={{ color: "var(--c-text)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="p-8 rounded-2xl text-center"
                style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.12), rgba(255,107,0,0.04))", border: "1px solid rgba(255,107,0,0.25)" }}>
                <div className="text-6xl font-black mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>+23%</div>
                <div className="font-semibold mb-1" style={{ color: "var(--c-text)" }}>Рост продаж у клиента</div>
                <div className="text-sm" style={{ color: "var(--c-muted)" }}>Акция стартовала вовремя благодаря быстрой печати</div>
              </div>
              <div className="p-6 rounded-2xl flex items-center gap-4" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                <div className="text-4xl">🏅</div>
                <div>
                  <div className="font-semibold" style={{ color: "var(--c-text)" }}>Благодарственное письмо</div>
                  <div className="text-sm" style={{ color: "var(--c-muted)" }}>Имя клиента не раскрываем, факт — подтверждаем документально</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24" style={{ background: "var(--c-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>КАК МЫ РАБОТАЕМ</div>
            <h2 className="font-black" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              ОТ ЗАЯВКИ<br /><span style={{ color: "var(--c-accent)" }}>ДО ДОСТАВКИ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <div key={i} className="group flex flex-col items-center text-center md:items-start md:text-left">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "var(--c-bg)", border: "2px solid var(--c-accent)" }}>
                  <Icon name={s.icon as AnyIcon} size={24} fallback="Circle" style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                </div>
                <div className="text-xs font-black mb-2" style={{ color: "var(--c-accent)", letterSpacing: "0.1em" }}>{s.num}</div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>{s.title}</h3>
                <p className="text-sm" style={{ color: "var(--c-muted)", lineHeight: 1.6 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24" style={{ background: "var(--c-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>ОТЗЫВЫ</div>
            <h2 className="font-black" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              НАМ ДОВЕРЯЮТ<br /><span style={{ color: "var(--c-accent)" }}>РЕАЛЬНЫЕ БИЗНЕСЫ</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="p-7 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:scale-[1.01]"
                style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                <div className="flex gap-1">
                  {Array.from({ length: r.stars }).map((_, j) => <span key={j} className="text-yellow-400 text-lg">★</span>)}
                </div>
                <p className="text-sm flex-1" style={{ color: "var(--c-muted)", lineHeight: 1.7 }}>«{r.text}»</p>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--c-text)" }}>{r.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--c-muted)" }}>{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24" style={{ background: "var(--c-surface)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>FAQ</div>
            <h2 className="font-black" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              ЧАСТЫЕ <span style={{ color: "var(--c-accent)" }}>ВОПРОСЫ</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--c-border)", background: "var(--c-bg)" }}>
                <button className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold transition-colors"
                  style={{ color: "var(--c-text)", background: "transparent" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18}
                    style={{ color: "var(--c-accent)", flexShrink: 0, marginLeft: "12px" } as React.CSSProperties} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm" style={{ color: "var(--c-muted)", lineHeight: 1.7, borderTop: "1px solid var(--c-border)" }}>
                    <div className="pt-4">{f.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ background: "var(--c-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>СВЯЗАТЬСЯ С НАМИ</div>
              <h2 className="font-black mb-8" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
                НАЧНЁМ<br /><span style={{ color: "var(--c-accent)" }}>ПРЯМО СЕЙЧАС</span>
              </h2>
              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "Email", val: "info@kartonpak.ru" },
                  { icon: "MapPin", label: "Производство", val: "Москва, ул. Промышленная, 14" },
                  { icon: "Clock", label: "Часы работы", val: "Пн–Пт 9:00–18:00" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,107,0,0.1)" }}>
                      <Icon name={c.icon as AnyIcon} size={18} fallback="Info" style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                    </div>
                    <div>
                      <div className="text-xs mb-0.5" style={{ color: "var(--c-muted)" }}>{c.label}</div>
                      <div className="font-semibold" style={{ color: "var(--c-text)" }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
              <h3 className="font-bold text-xl mb-6" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Оставить заявку</h3>
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Ваше имя" className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                  style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--c-accent)"; }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--c-border)"; }} />
                <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                  style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--c-accent)"; }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--c-border)"; }} />
                <input type="text" placeholder="Название компании" className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                  style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}
                  onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--c-accent)"; }}
                  onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = "var(--c-border)"; }} />
                <textarea rows={3} placeholder="Опишите, что нужно (тип упаковки, тираж, сроки)"
                  className="w-full px-4 py-3 rounded-xl outline-none resize-none transition-all"
                  style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}
                  onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = "var(--c-accent)"; }}
                  onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = "var(--c-border)"; }} />
                <button className="w-full py-4 rounded-xl font-bold text-black text-base transition-all hover:opacity-90 hover:scale-[1.01]"
                  style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
                <p className="text-xs text-center" style={{ color: "var(--c-muted)" }}>Технолог перезвонит в течение 30 минут в рабочее время</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center" style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)" }}>
        <div className="font-bold text-xl mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-accent)" }}>
          КАРТОН<span style={{ color: "var(--c-text)" }}>ПАК</span>
        </div>
        <div className="text-sm" style={{ color: "var(--c-muted)" }}>© 2024 КартонПак. Производство упаковки из картона на заказ. Москва.</div>
      </footer>

      <style>{`
        :root {
          --c-bg: #0e0e10;
          --c-surface: #16161a;
          --c-border: #2a2a30;
          --c-text: #f0f0f2;
          --c-muted: #8a8a99;
          --c-accent: #ff6b00;
        }
        @keyframes scanline {
          from { transform: translateY(-10px); opacity: 0.04; }
          to { transform: translateY(10px); opacity: 0.08; }
        }
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.3; }
        }
        input::placeholder, textarea::placeholder { color: var(--c-muted); }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}