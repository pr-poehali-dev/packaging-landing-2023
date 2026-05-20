import React, { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type AnyIcon = string;

const HERO_IMAGE = "https://cdn.poehali.dev/projects/10bd6f4a-1016-49d2-98a0-b68c65f90cfa/files/6cab639f-4145-42ae-bfc1-d786bd55a15d.jpg";

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
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

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d) return "";
  let r = "+7";
  if (d.length > 1) r += " (" + d.slice(1, 4);
  if (d.length >= 4) r += ") " + d.slice(4, 7);
  if (d.length >= 7) r += "-" + d.slice(7, 9);
  if (d.length >= 9) r += "-" + d.slice(9, 11);
  return r;
}

function validateName(v: string) { return v.trim().length >= 2; }
function validatePhone(v: string) { return v.replace(/\D/g, "").length === 11; }

const NAV_LINKS = [
  { label: "Преимущества", href: "#advantages" },
  { label: "Продукция", href: "#portfolio" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const ADVANTAGES = [
  { icon: "Factory", title: "Своё производство", text: "Не платите за аренду склада и логистику сторонних перевозчиков — у нас всё своё." },
  { icon: "ShieldCheck", title: "Контроль на каждом этапе", text: "Технолог на линии проверяет плотность, склейку и совпадение цвета с макетом." },
  { icon: "PackageCheck", title: "Запас 2% в тираже", text: "Во избежание брака печатаем на 2% выше требуемого тиража." },
  { icon: "Truck", title: "Своя доставка — без посредников", text: "Грузовики типографии, а не курьерские службы. Ответственность за сохранность — наша." },
];

const PORTFOLIO_ITEMS = [
  { icon: "Hamburger", title: "Фастфуд и продукты", desc: "Коробки, пакеты, контейнеры. Любой размер, полноцветная печать." },
  { icon: "Cake", title: "Кондитерские изделия", desc: "Коробки для тортов, пирожных, конфет. С окном и без." },
  { icon: "ShoppingBasket", title: "Крупы, чай, кофе", desc: "Пакеты с zip-lock, коробки, сашетки. Барьерные материалы." },
  { icon: "WashingMachine", title: "Бытовая химия", desc: "Упаковка из плотного картона с ламинацией. Устойчива к влаге." },
  { icon: "Pill", title: "Фармацевтические препараты", desc: "Пачки из мелованного картона по ГОСТ. Сериализация." },
  { icon: "FlaskConical", title: "Парфюмерия и косметика", desc: "Люксовая упаковка с тиснением, фольгой, выборочным UV." },
  { icon: "Gem", title: "Обечайка", desc: "Цилиндрическая упаковка для чая, косметики, подарков." },
  { icon: "Pill", title: "БАДы", desc: "Картонная упаковка с маркировкой, штрихкодами и серийными номерами." },
  { icon: "Package", title: "Гофрокороба малых тиражей", desc: "От 1000 шт. — под заказ. Уточняйте у менеджера.", badge: "Под заказ" },
];

const GALLERY_IMAGES = [
  { url: HERO_IMAGE, caption: "Упаковка для фастфуда" },
  { url: HERO_IMAGE, caption: "Упаковка для кондитерских изделий" },
  { url: HERO_IMAGE, caption: "Благодарственное письмо от клиента" },
];

type PortfolioProject = {
  id: number;
  category: string;
  title: string;
  volume: string;
  material: string;
  deadline: string;
  format: string;
  density: string;
  printType: string;
  result: string;
  img: string;
};

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  { id: 1, category: "Фастфуд", title: "Крафт-пакет с логотипом", volume: "50 000 шт.", material: "Крафт-бумага 120 г/м²", deadline: "4 дня", format: "330×200×100 мм", density: "120 г/м²", printType: "Офсетная 4+0", result: "Акция запущена вовремя, продажи +23%" , img: HERO_IMAGE },
  { id: 2, category: "Кондитерские", title: "Коробка под торт с окном", volume: "10 000 шт.", material: "Мелованный картон 350 г/м²", deadline: "5 дней", format: "250×250×120 мм", density: "350 г/м²", printType: "Офсет 4+0 + лак", result: "Постоянный клиент, 3 повторных заказа", img: HERO_IMAGE },
  { id: 3, category: "Бакалея", title: "Коробка для чая (80 пакетиков)", volume: "20 000 шт.", material: "Картон FBB 300 г/м²", deadline: "6 дней", format: "160×100×80 мм", density: "300 г/м²", printType: "Офсет 4+4 + матовая ламинация", result: "Выход на федеральные сети", img: HERO_IMAGE },
  { id: 4, category: "Фармацевтика", title: "Пачка для капсул (ГОСТ)", volume: "100 000 шт.", material: "Мелованный картон 260 г/м²", deadline: "7 дней", format: "110×40×30 мм", density: "260 г/м²", printType: "Офсет 4+4, сериализация", result: "Регистрация препарата в Росздравнадзоре", img: HERO_IMAGE },
  { id: 5, category: "Косметика", title: "Обечайка для крема с тиснением", volume: "5 000 шт.", material: "Мелованный картон 400 г/м²", deadline: "8 дней", format: "Диаметр 80 мм, высота 120 мм", density: "400 г/м²", printType: "Офсет + тиснение золото + выборочный UV", result: "Премиум-линейка, рост среднего чека на 18%", img: HERO_IMAGE },
  { id: 6, category: "Бытовая химия", title: "Коробка под стиральный порошок", volume: "30 000 шт.", material: "Картон с влагостойкой ламинацией", deadline: "5 дней", format: "280×180×90 мм", density: "320 г/м²", printType: "Офсет 4+0 + глянцевая ламинация", result: "Размещение в розничных сетях Москвы", img: HERO_IMAGE },
  { id: 7, category: "БАДы", title: "Картонная упаковка для витаминов", volume: "15 000 шт.", material: "Мелованный картон 300 г/м²", deadline: "5 дней", format: "120×60×40 мм", density: "300 г/м²", printType: "Офсет 4+4 + матовая ламинация + штрихкод", result: "Успешный запуск на маркетплейсах", img: HERO_IMAGE },
];

const PORTFOLIO_CATEGORIES = ["Все", "Фастфуд", "Кондитерские", "Бакалея", "Фармацевтика", "Косметика", "Бытовая химия", "БАДы"];

const REVIEWS = [
  { initial: "А", name: "Алексей М.", role: "Маркетинг-директор, FMCG", date: "март 2025", text: "Заказывали каталоги срочно — за 3 дня до выставки. Сделали без вопросов, качество идеальное. Теперь работаем только с ними.", stars: 5 },
  { initial: "С", name: "Светлана К.", role: "Дизайнер, агентство", date: "февраль 2025", text: "Технолог сам нашёл ошибку в макете и предупредил. Сэкономили нас от брака. Вот это сервис! Рекомендую всем коллегам.", stars: 5 },
  { initial: "Д", name: "Дмитрий Ф.", role: "Генеральный директор, сеть ресторанов", date: "январь 2025", text: "Печатают меню для всех наших точек уже 2 года. Стабильное качество, привозят день в день. Ни разу не подводили.", stars: 5 },
  { initial: "О", name: "Ольга Н.", role: "Менеджер по закупкам", date: "декабрь 2024", text: "Цена реально ниже рынка. Сравнивала 5 типографий — выбрала их. Буклеты получились отличные, клиенты хвалят.", stars: 5 },
  { initial: "И", name: "Иван П.", role: "Владелец бизнеса", date: "ноябрь 2024", text: "Тестовый тираж бесплатно — это решило все сомнения. Цвет точный, бумага плотная. Однозначно продолжим сотрудничество.", stars: 5 },
  { initial: "Е", name: "Екатерина Л.", role: "PR-менеджер", date: "октябрь 2024", text: "Хорошая типография. Сделали годовой отчёт для акционеров. Небольшая задержка с согласованием цвета, но итог превзошёл ожидания.", stars: 5 },
];

const FAQS = [
  { q: "Какой минимальный тираж?", a: "От 5 000 экземпляров. Для гофрокороба — от 1 000 шт. (уточняйте)." },
  { q: "Сколько стоит цветопроба?", a: "Цветопроба — бесплатно. Вы утверждаете цвет до запуска тиража." },
  { q: "Какой срок производства?", a: "Стандартный срок — 5 дней. При срочном заказе уточняйте у менеджера." },
  { q: "Нужен ли готовый макет?", a: "Нет. Наш дизайнер поможет разработать макет. Это услуга, стоимость уточняется." },
  { q: "Как происходит доставка?", a: "Доставляем собственным транспортом в Москве и МО. Для других регионов — согласовывается отдельно." },
  { q: "Можно ли посмотреть образцы материалов?", a: "Да! Заполните форму — привезём образцы на адрес вашего офиса бесплатно." },
];

const QUIZ_PRODUCTS = [
  { icon: "Hamburger", label: "Фастфуд и продукты" },
  { icon: "Cake", label: "Кондитерские изделия" },
  { icon: "ShoppingBasket", label: "Крупы, чай, кофе" },
  { icon: "WashingMachine", label: "Бытовая химия" },
  { icon: "Pill", label: "Фармацевтика" },
  { icon: "FlaskConical", label: "Косметика и парфюм" },
  { icon: "Gem", label: "Обечайка" },
  { icon: "Pill", label: "БАДы" },
  { icon: "CircleHelp", label: "Другое" },
];

function StyledInput({ placeholder, type = "text", value, onChange, error, onFocus, onBlur }: {
  placeholder: string; type?: string; value: string;
  onChange: (v: string) => void; error?: boolean;
  onFocus?: () => void; onBlur?: () => void;
}) {
  return (
    <input type={type} placeholder={placeholder} value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={onFocus} onBlur={onBlur}
      className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm"
      style={{
        background: "var(--c-bg)", color: "var(--c-text)",
        border: `1px solid ${error ? "#ef4444" : "var(--c-border)"}`,
      }}
    />
  );
}

function PhoneInput({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: boolean }) {
  const handleChange = (raw: string) => onChange(formatPhone(raw));
  return (
    <input type="tel" placeholder="+7 (___) ___-__-__" value={value}
      onChange={e => handleChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm"
      style={{ background: "var(--c-bg)", color: "var(--c-text)", border: `1px solid ${error ? "#ef4444" : "var(--c-border)"}` }}
    />
  );
}

function PrivacyCheck({ checked, onChange, error }: { checked: boolean; onChange: (v: boolean) => void; error?: boolean }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <div onClick={() => onChange(!checked)}
        className="flex-shrink-0 w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-all"
        style={{ background: checked ? "var(--c-accent)" : "var(--c-bg)", border: `1.5px solid ${error ? "#ef4444" : checked ? "var(--c-accent)" : "var(--c-border)"}` }}>
        {checked && <Icon name="Check" size={12} style={{ color: "#000" } as React.CSSProperties} />}
      </div>
      <span className="text-xs leading-relaxed" style={{ color: "var(--c-muted)" }}>
        Соглашаюсь с <span style={{ color: "var(--c-accent)", textDecoration: "underline", cursor: "pointer" }}>Политикой конфиденциальности</span>
      </span>
    </label>
  );
}

function FileInput({ onChange }: { onChange: (f: File | null) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  return (
    <div>
      <input ref={inputRef} type="file" accept=".pdf,.ai,.eps,.psd,.png,.jpg,.zip" className="hidden"
        onChange={e => { const f = e.target.files?.[0] ?? null; onChange(f); setFileName(f?.name ?? ""); }} />
      <button type="button" onClick={() => inputRef.current?.click()}
        className="w-full px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-2 hover:opacity-80"
        style={{ background: "var(--c-bg)", border: "1px dashed var(--c-border)", color: "var(--c-muted)" }}>
        <Icon name="Paperclip" size={16} />
        <span>{fileName || "Прикрепить файл (макет, ТЗ)"}</span>
      </button>
    </div>
  );
}

function CallbackModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const submit = () => {
    const e: Record<string, boolean> = {};
    if (!validateName(name)) e.name = true;
    if (!validatePhone(phone)) e.phone = true;
    if (!privacy) e.privacy = true;
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}>
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", maxWidth: "420px" }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 transition-colors" style={{ color: "var(--c-muted)" }}>
          <Icon name="X" size={22} />
        </button>
        {!sent ? (
          <div className="p-8">
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Перезвоните мне</h3>
            <p className="mb-6 text-sm" style={{ color: "var(--c-muted)" }}>Изучим ваш макет и поможем сэкономить до 20% на заказе.</p>
            <div className="flex flex-col gap-3">
              <StyledInput placeholder="Ваше имя" value={name} onChange={setName} error={errors.name} />
              {errors.name && <span className="text-xs text-red-400 -mt-2">Введите имя (минимум 2 символа)</span>}
              <PhoneInput value={phone} onChange={setPhone} error={errors.phone} />
              {errors.phone && <span className="text-xs text-red-400 -mt-2">Введите корректный номер телефона</span>}
              <textarea rows={3} placeholder="Комментарий (необязательно)" value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none resize-none text-sm"
                style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }} />
              <FileInput onChange={() => {}} />
              <PrivacyCheck checked={privacy} onChange={setPrivacy} error={errors.privacy} />
              {errors.privacy && <span className="text-xs text-red-400 -mt-2">Необходимо ваше согласие</span>}
            </div>
            <button onClick={submit} className="w-full mt-5 py-3 rounded-xl font-bold text-black transition-all hover:opacity-90"
              style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
              ОТПРАВИТЬ
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Заявка принята!</h3>
            <p style={{ color: "var(--c-muted)" }}>Перезвоним вам в течение 30 минут в рабочее время.</p>
            <button onClick={onClose} className="mt-6 px-8 py-3 rounded-xl font-bold text-black"
              style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif" }}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const TOTAL_STEPS = 4;

  const handleProduct = (val: string) => {
    setAnswers({ ...answers, product: val });
    setStep(1);
  };

  const handleVolume = (val: string) => {
    setAnswers({ ...answers, volume: val });
    setStep(2);
  };

  const handleDesign = (val: string) => {
    setAnswers({ ...answers, design: val });
    setStep(3);
  };

  const handleDeadline = (val: string) => {
    setAnswers({ ...answers, deadline: val });
    setStep(4);
  };

  const submitFinal = () => {
    const e: Record<string, boolean> = {};
    if (!validateName(name)) e.name = true;
    if (!validatePhone(phone)) e.phone = true;
    if (!privacy) e.privacy = true;
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  const deadlines = [
    { label: "Срочно (1–2 дня)", sub: "Срочный тираж", icon: "Zap" },
    { label: "3–5 дней", sub: "Стандартный срок", icon: "Clock" },
    { label: "5–10 дней", sub: "Без спешки", icon: "Calendar" },
    { label: "Нужна лучшая цена", sub: "Срок не горит", icon: "Tag" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.88)" }}
      onClick={onClose}>
      <div className="relative w-full max-w-xl rounded-2xl p-8 max-h-[85vh] overflow-y-auto" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 transition-colors" style={{ color: "var(--c-muted)" }}>
          <Icon name="X" size={22} />
        </button>

        {!submitted && step < 4 && (
          <>
            <div className="mb-2 text-xs font-bold" style={{ color: "var(--c-accent)", letterSpacing: "0.1em" }}>ШАГ {step + 1} ИЗ {TOTAL_STEPS}</div>
            <div className="w-full h-1 rounded-full mb-6" style={{ background: "var(--c-border)" }}>
              <div className="h-1 rounded-full transition-all duration-500" style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%`, background: "var(--c-accent)" }} />
            </div>
          </>
        )}

        {!submitted && step === 0 && (
          <>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Для какого товара нужна упаковка?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {QUIZ_PRODUCTS.map((p) => (
                <button key={p.label} onClick={() => handleProduct(p.label)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all hover:scale-[1.04]"
                  style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-accent)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border)"; }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,107,0,0.1)" }}>
                    <Icon name={p.icon as AnyIcon} size={22} fallback="Package" style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                  </div>
                  <span className="text-xs font-medium leading-tight">{p.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {!submitted && step === 1 && (
          <>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Какой тираж вы планируете?</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "До 1 000 шт.", icon: "Hash" },
                { label: "от 1 000 до 5 000 шт.", icon: "BarChart2" },
                { label: "5 000 – 20 000 шт.", icon: "TrendingUp" },
                { label: "20 000 – 100 000 шт.", icon: "Layers" },
                { label: "Более 100 000 шт.", icon: "Zap" },
              ].map(opt => (
                <button key={opt.label} onClick={() => handleVolume(opt.label)}
                  className="flex items-center gap-3 text-left px-5 py-3 rounded-xl font-medium transition-all hover:scale-[1.02]"
                  style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-accent)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border)"; }}>
                  <Icon name={opt.icon as AnyIcon} size={18} style={{ color: "var(--c-accent)", flexShrink: 0 } as React.CSSProperties} />
                  {opt.label}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(0)} className="mt-4 flex items-center gap-2 text-sm transition-colors hover:opacity-80" style={{ color: "var(--c-muted)" }}>
              <Icon name="ChevronLeft" size={16} />
              Назад
            </button>
          </>
        )}

        {!submitted && step === 2 && (
          <>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Есть ли у вас готовый макет?</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Да, есть макет", icon: "FileCheck" },
                { label: "Нет, нужна разработка", icon: "Pencil" },
                { label: "Только идея", icon: "Lightbulb" },
              ].map(opt => (
                <button key={opt.label} onClick={() => handleDesign(opt.label)}
                  className="flex items-center gap-3 text-left px-5 py-3 rounded-xl font-medium transition-all hover:scale-[1.02]"
                  style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-accent)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border)"; }}>
                  <Icon name={opt.icon as AnyIcon} size={18} style={{ color: "var(--c-accent)", flexShrink: 0 } as React.CSSProperties} />
                  {opt.label}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-4 flex items-center gap-2 text-sm transition-colors hover:opacity-80" style={{ color: "var(--c-muted)" }}>
              <Icon name="ChevronLeft" size={16} />
              Назад
            </button>
          </>
        )}

        {!submitted && step === 3 && (
          <>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Какой срок сдачи?</h3>
            <div className="flex flex-col gap-3">
              {deadlines.map(d => (
                <button key={d.label} onClick={() => handleDeadline(d.label)}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all hover:scale-[1.02]"
                  style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-accent)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border)"; }}>
                  <Icon name={d.icon as AnyIcon} size={20} fallback="Clock" style={{ color: "var(--c-accent)", flexShrink: 0 } as React.CSSProperties} />
                  <div>
                    <div className="font-semibold text-sm">{d.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--c-muted)" }}>{d.sub}</div>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="mt-4 flex items-center gap-2 text-sm transition-colors hover:opacity-80" style={{ color: "var(--c-muted)" }}>
              <Icon name="ChevronLeft" size={16} />
              Назад
            </button>
          </>
        )}

        {!submitted && step === 4 && (
          <>
            <div className="mb-6 p-4 rounded-xl" style={{ background: "rgba(255,107,0,0.08)", border: "1px solid rgba(255,107,0,0.2)" }}>
              <p className="font-semibold mb-1" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Почти готово!</p>
              <p className="text-sm" style={{ color: "var(--c-muted)" }}>Оставьте контакты и мы пришлём точный расчёт + закрепим <strong style={{ color: "var(--c-accent)" }}>скидку 10%</strong> за вашим первым заказом.</p>
            </div>
            <div className="flex flex-col gap-3">
              <StyledInput placeholder="Ваше имя, например Иван *" value={name} onChange={setName} error={errors.name} />
              {errors.name && <span className="text-xs text-red-400 -mt-2">Введите имя</span>}
              <PhoneInput value={phone} onChange={setPhone} error={errors.phone} />
              {errors.phone && <span className="text-xs text-red-400 -mt-2">Введите корректный номер</span>}
              <StyledInput placeholder="Email (необязательно)" value={email} onChange={setEmail} />
              <textarea rows={2} placeholder="Комментарий (необязательно)" value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl outline-none resize-none text-sm"
                style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }} />
              <PrivacyCheck checked={privacy} onChange={setPrivacy} error={errors.privacy} />
              {errors.privacy && <span className="text-xs text-red-400 -mt-2">Необходимо ваше согласие</span>}
            </div>
            <button onClick={submitFinal} className="w-full mt-5 py-3 rounded-xl font-bold text-black transition-all hover:opacity-90"
              style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
              ПОЛУЧИТЬ РАСЧЁТ СО СКИДКОЙ 10%
            </button>
          </>
        )}

        {submitted && (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Спасибо за заявку!</h3>
            <p className="mb-6 text-sm" style={{ color: "var(--c-muted)" }}>
              Ваша заявка на печать упаковки принята. Менеджер свяжется с вами в течение 1 рабочего часа (с 9 до 18 в будни).
            </p>
            <div className="text-left p-5 rounded-xl mb-6" style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--c-text)" }}>Что вы получите:</p>
              <div className="flex flex-col gap-2">
                {["Точный расчёт в таблице", "Контрольные листы для подписи (опционально)", "Предложение о бесплатном тестовом тираже (для новых клиентов)"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} style={{ color: "var(--c-accent)", marginTop: "2px", flexShrink: 0 } as React.CSSProperties} />
                    <span className="text-sm" style={{ color: "var(--c-muted)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={onClose} className="px-8 py-3 rounded-xl font-bold text-black"
              style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif" }}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState<number | null>(null);
  const [portfolioCat, setPortfolioCat] = useState("Все");
  const [portfolioModal, setPortfolioModal] = useState<PortfolioProject | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const [conName, setConName] = useState("");
  const [conPhone, setConPhone] = useState("");
  const [conCompany, setConCompany] = useState("");
  const [conText, setConText] = useState("");
  const [conPrivacy, setConPrivacy] = useState(false);
  const [conErrors, setConErrors] = useState<Record<string, boolean>>({});
  const [conSent, setConSent] = useState(false);

  const statsRef = useInView();
  const c1 = useCountUp(5000, 1200, statsRef.inView);
  const c2 = useCountUp(15, 1000, statsRef.inView);
  const c3 = useCountUp(5, 800, statsRef.inView);
  const c4 = useCountUp(200, 1400, statsRef.inView);



  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitContact = () => {
    const e: Record<string, boolean> = {};
    if (!validateName(conName)) e.name = true;
    if (!validatePhone(conPhone)) e.phone = true;
    if (!conPrivacy) e.privacy = true;
    setConErrors(e);
    if (Object.keys(e).length === 0) setConSent(true);
  };

  return (
    <div style={{ fontFamily: "Golos Text, sans-serif", background: "var(--c-bg)", color: "var(--c-text)", overflowX: "hidden" }}>
      {quizOpen && <QuizModal onClose={() => setQuizOpen(false)} />}
      {callbackOpen && <CallbackModal onClose={() => setCallbackOpen(false)} />}

      {/* FIXED WIDGETS */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3 items-end">
        {showScrollTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}>
            <Icon name="ChevronUp" size={20} />
          </button>
        )}
        <button onClick={() => setCallbackOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-bold text-sm text-black transition-all hover:scale-105"
          style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.03em" }}>
          <Icon name="MessageCircle" size={18} style={{ color: "#000" } as React.CSSProperties} />
          <span className="hidden sm:inline">Обратная связь</span>
        </button>
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{ background: scrolled ? "rgba(14,14,16,0.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid var(--c-border)" : "none" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ background: "rgba(0,0,0,0.55)", padding: "4px 8px" }}>
              <img src="https://cdn.poehali.dev/projects/10bd6f4a-1016-49d2-98a0-b68c65f90cfa/bucket/8e242036-f301-496c-a31e-6ff645298a3f.png" alt="ПК Запад" style={{ height: "36px", width: "auto", display: "block" }} />
            </div>
            <div className="hidden lg:flex flex-col text-xs leading-tight" style={{ color: "var(--c-muted)" }}>
              <span>Надёжная офсетная типография</span>
              <span>полного цикла в Москве</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium transition-colors hover:opacity-80 whitespace-nowrap" style={{ color: "var(--c-muted)" }}>{l.label}</a>
            ))}
          </div>
          <div className="hidden lg:flex flex-col items-end gap-0.5 flex-shrink-0">
            <a href="tel:+74950000000" className="text-sm font-semibold transition-colors hover:opacity-80 whitespace-nowrap"
              style={{ color: "var(--c-text)" }}>+7 (495) 000-00-00</a>
            <a href="mailto:info@pkzapad.ru" className="text-xs transition-colors hover:opacity-80 whitespace-nowrap"
              style={{ color: "var(--c-muted)" }}>info@pkzapad.ru</a>
          </div>
          <button onClick={() => setCallbackOpen(true)} className="hidden md:block px-5 py-2 rounded-lg font-bold text-black text-sm transition-opacity hover:opacity-90 whitespace-nowrap flex-shrink-0"
            style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
            ПЕРЕЗВОНИТЕ МНЕ
          </button>
          <div className="flex md:hidden items-center gap-3">
            <a href="tel:+74950000000" className="text-sm font-bold whitespace-nowrap" style={{ color: "var(--c-accent)" }}>
              +7 (495) 000-00-00
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2" style={{ color: "var(--c-text)" }}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3" style={{ background: "rgba(14,14,16,0.98)" }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium border-b"
                style={{ color: "var(--c-muted)", borderColor: "var(--c-border)" }}>{l.label}</a>
            ))}
            <button onClick={() => { setCallbackOpen(true); setMenuOpen(false); }} className="mt-2 py-3 rounded-lg font-bold text-black"
              style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif" }}>ПЕРЕЗВОНИТЕ МНЕ</button>
            <div className="flex flex-col gap-2 pt-3 mt-1" style={{ borderTop: "1px solid var(--c-border)" }}>
              <a href="tel:+74950000000" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--c-text)" }}>
                <Icon name="Phone" size={15} style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                +7 (495) 000-00-00
              </a>
              <a href="mailto:info@pkzapad.ru" className="flex items-center gap-2 text-sm" style={{ color: "var(--c-muted)" }}>
                <Icon name="Mail" size={15} style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                info@pkzapad.ru
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden" id="hero"
        style={{
          backgroundImage: `linear-gradient(110deg, rgba(14,14,16,0.96) 45%, rgba(14,14,16,0.6) 100%), url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, rgba(255,107,0,0.15) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute" style={{ top: `${10 + i * 18}%`, left: "-10%", right: "-10%", height: "1px",
              background: "linear-gradient(90deg, transparent, var(--c-accent), transparent)", opacity: 0.05,
              animation: `scanline ${3 + i * 0.7}s ease-in-out infinite alternate`, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.3)", color: "var(--c-accent)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--c-accent)" }} />
              Собственное производство · Москва
            </div>

            <h1 className="font-black leading-tight mb-2"
              style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", letterSpacing: "-0.01em", color: "var(--c-text)" }}>
              Производство и печать упаковки из картона
            </h1>
            <h2 className="font-black leading-tight mb-3"
              style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(1.6rem, 4vw, 3.2rem)", letterSpacing: "-0.01em", color: "var(--c-text)" }}>
              от <span style={{ color: "var(--c-accent)" }}>5 000 шт.</span> в Москве за <span style={{ color: "var(--c-accent)" }}>5 дней</span>
            </h2>

            <p className="mb-6 font-medium" style={{ color: "var(--c-muted)", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", lineHeight: 1.6, maxWidth: "560px" }}>
              с гарантией качества и соблюдения сроков
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {["Цветопроба за 0 ₽", "На 15% ниже рынка", "Доставка в день готовности"].map((tag) => (
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
              </button>
              <button onClick={() => setCallbackOpen(true)}
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
      <section id="advantages" className="py-20" style={{ background: "var(--c-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>ПОЧЕМУ МЫ</div>
            <h2 className="font-black" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              ГАРАНТИИ,<br /><span style={{ color: "var(--c-accent)" }}>КОТОРЫЕ РАБОТАЮТ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {ADVANTAGES.map((a, i) => (
              <div key={i} className="p-8 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--c-accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--c-border)"; }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(255,107,0,0.12)" }}>
                  <Icon name={a.icon as AnyIcon} size={24} fallback="Star" style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                </div>
                <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>{a.title}</h3>
                <p style={{ color: "var(--c-muted)", lineHeight: 1.7 }}>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20" style={{ background: "var(--c-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>ЧТО МЫ ДЕЛАЕМ</div>
            <h2 className="font-black mb-4" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              Продукция, которую<br /><span style={{ color: "var(--c-accent)" }}>мы печатаем</span>
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
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(255,107,0,0.12)" }}>
                  <Icon name={item.icon as AnyIcon} size={26} fallback="Package" style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                </div>
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

      {/* PORTFOLIO GALLERY */}
      <section id="works" className="py-20" style={{ background: "var(--c-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>ПОРТФОЛИО</div>
            <h2 className="font-black mb-3" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              Реальные проекты от сетей<br /><span style={{ color: "var(--c-accent)" }}>фастфуда и производителей</span>
            </h2>
            <p className="text-sm mb-8 flex items-center gap-2" style={{ color: "var(--c-muted)" }}>
              <Icon name="Lock" size={14} />
              При личной встрече покажем ещё 20+ проектов, которые нельзя публиковать в открытом доступе.
            </p>
            {/* Desktop filters */}
            <div className="hidden sm:flex flex-wrap gap-2">
              {PORTFOLIO_CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setPortfolioCat(cat)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: portfolioCat === cat ? "var(--c-accent)" : "var(--c-surface)",
                    color: portfolioCat === cat ? "#000" : "var(--c-muted)",
                    border: `1px solid ${portfolioCat === cat ? "var(--c-accent)" : "var(--c-border)"}`,
                  }}>
                  {cat}
                </button>
              ))}
            </div>
            {/* Mobile filters dropdown */}
            <div className="sm:hidden relative">
              <button onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}>
                <Icon name="SlidersHorizontal" size={16} style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                {portfolioCat === "Все" ? "Фильтр по категории" : portfolioCat}
                <Icon name={filterOpen ? "ChevronUp" : "ChevronDown"} size={14} />
              </button>
              {filterOpen && (
                <div className="absolute left-0 top-full mt-2 z-20 rounded-2xl overflow-hidden shadow-xl min-w-[200px]"
                  style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
                  {PORTFOLIO_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => { setPortfolioCat(cat); setFilterOpen(false); }}
                      className="w-full text-left px-5 py-3 text-sm font-medium transition-colors"
                      style={{
                        background: portfolioCat === cat ? "rgba(255,107,0,0.12)" : "transparent",
                        color: portfolioCat === cat ? "var(--c-accent)" : "var(--c-text)",
                        borderBottom: "1px solid var(--c-border)",
                      }}>
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {PORTFOLIO_PROJECTS.filter(p => portfolioCat === "Все" || p.category === portfolioCat).map(p => (
              <div key={p.id} className="rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
                style={{ border: "1px solid var(--c-border)", background: "var(--c-surface)" }}
                onClick={() => setPortfolioModal(p)}>
                <div className="relative" style={{ aspectRatio: "4/3" }}>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-start p-3">
                    <span className="px-2 py-1 rounded-md text-xs font-bold" style={{ background: "rgba(255,107,0,0.85)", color: "#000" }}>{p.category}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(255,107,0,0.2)" }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,107,0,0.9)" }}>
                      <Icon name="ZoomIn" size={20} style={{ color: "#000" } as React.CSSProperties} />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.35)" }}>
                    <span className="px-3 py-1 rounded-full text-xs font-bold border" style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.3)" }}>ПРИМЕР</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>{p.title}</h3>
                  <div className="flex flex-col gap-1 text-xs" style={{ color: "var(--c-muted)" }}>
                    <span>Тираж: <strong style={{ color: "var(--c-text)" }}>{p.volume}</strong></span>
                    <span>Материал: <strong style={{ color: "var(--c-text)" }}>{p.material}</strong></span>
                    <span>Срок: <strong style={{ color: "var(--c-accent)" }}>{p.deadline}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {portfolioModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setPortfolioModal(null)}>
            <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}
              onClick={e => e.stopPropagation()}>
              <button onClick={() => setPortfolioModal(null)} className="absolute top-4 right-4 z-10 transition-colors" style={{ color: "var(--c-muted)" }}>
                <Icon name="X" size={22} />
              </button>
              <div className="relative" style={{ aspectRatio: "16/7" }}>
                <img src={portfolioModal.img} alt={portfolioModal.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.35)" }}>
                  <span className="px-4 py-2 rounded-full text-sm font-bold border" style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.3)" }}>ПРИМЕР</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-2 py-1 rounded-md text-xs font-bold mb-3" style={{ background: "rgba(255,107,0,0.15)", color: "var(--c-accent)", border: "1px solid rgba(255,107,0,0.3)" }}>{portfolioModal.category}</span>
                <h3 className="font-black text-2xl mb-5" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>{portfolioModal.title}</h3>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: "Тираж", val: portfolioModal.volume },
                    { label: "Срок", val: portfolioModal.deadline },
                    { label: "Формат", val: portfolioModal.format },
                    { label: "Плотность", val: portfolioModal.density },
                    { label: "Вид печати", val: portfolioModal.printType },
                    { label: "Материал", val: portfolioModal.material },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl" style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)" }}>
                      <div className="text-xs mb-0.5" style={{ color: "var(--c-muted)" }}>{item.label}</div>
                      <div className="text-sm font-semibold" style={{ color: "var(--c-text)" }}>{item.val}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl mb-5" style={{ background: "rgba(255,107,0,0.08)", border: "1px solid rgba(255,107,0,0.2)" }}>
                  <Icon name="TrendingUp" size={20} style={{ color: "var(--c-accent)", flexShrink: 0, marginTop: 2 } as React.CSSProperties} />
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--c-muted)" }}>Результат</div>
                    <div className="text-sm font-semibold" style={{ color: "var(--c-text)" }}>{portfolioModal.result}</div>
                  </div>
                </div>
                <button onClick={() => { setPortfolioModal(null); setQuizOpen(true); }}
                  className="w-full py-4 rounded-xl font-bold text-black transition-all hover:opacity-90"
                  style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                  МНЕ НУЖНО ТАК ЖЕ →
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20" style={{ background: "var(--c-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>КЕЙСЫ</div>
            <h2 className="font-black mb-4" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              Истории успеха<br /><span style={{ color: "var(--c-accent)" }}>наших партнёров</span>
            </h2>
          </div>

          {/* CASE — horizontal */}
          <div className="rounded-2xl overflow-hidden mb-10" style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
            <div className="p-8">
              <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>КЕЙС</div>
              <h3 className="font-black mb-4" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: "var(--c-text)" }}>
                Как мы напечатали 50 000 крафт-пакетов для сети фастфуда за 4 дня
              </h3>
              <p className="mb-5 text-sm max-w-2xl" style={{ color: "var(--c-muted)", lineHeight: 1.7 }}>
                Сеть запускала новую акцию «Двойной бургер». Нужно было 50 000 пакетов с ярким дизайном и плотностью бумаги 120 г/м². Срок — 4 дня.
              </p>
              <div className="flex flex-col gap-3 mb-5">
                {[
                  { icon: "CheckCircle", text: "За 1 день утвердили цветопробу" },
                  { icon: "Layers", text: "Печатали на двух линиях параллельно" },
                  { icon: "Truck", text: "Своя доставка к утру пятого дня" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Icon name={item.icon as AnyIcon} size={16} style={{ color: "var(--c-accent)", flexShrink: 0 } as React.CSSProperties} />
                    <span className="text-sm" style={{ color: "var(--c-text)" }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl max-w-sm" style={{ background: "rgba(255,107,0,0.08)", border: "1px solid rgba(255,107,0,0.2)" }}>
                <Icon name="TrendingUp" size={24} style={{ color: "var(--c-accent)", flexShrink: 0 } as React.CSSProperties} />
                <div>
                  <div className="font-black text-lg" style={{ color: "var(--c-accent)" }}>+23% к продажам</div>
                  <div className="text-xs" style={{ color: "var(--c-muted)" }}>Акция стартовала вовремя. Клиент выдал благодарственное письмо.</div>
                </div>
              </div>
            </div>
          </div>

          {/* PHOTO GALLERY */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl cursor-pointer group"
                style={{ aspectRatio: "4/3", border: "1px solid var(--c-border)" }}
                onClick={() => setGalleryIdx(i)}>
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end p-3" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.65) 0%, transparent 60%)" }}>
                  <span className="text-xs font-medium" style={{ color: "#fff" }}>{img.caption}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(255,107,0,0.15)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,107,0,0.8)" }}>
                    <Icon name="ZoomIn" size={18} style={{ color: "#000" } as React.CSSProperties} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {galleryIdx !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.92)" }}
              onClick={() => setGalleryIdx(null)}>
              <div className="relative max-w-xl w-full" onClick={e => e.stopPropagation()}>
                <button onClick={() => setGalleryIdx(null)} className="absolute -top-10 right-0 z-10" style={{ color: "#fff" }}>
                  <Icon name="X" size={24} />
                </button>
                <img src={GALLERY_IMAGES[galleryIdx].url} alt="" className="w-full rounded-2xl" />
                <p className="text-center mt-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{GALLERY_IMAGES[galleryIdx].caption}</p>
                <div className="flex justify-center gap-4 mt-4">
                  <button onClick={() => setGalleryIdx((galleryIdx - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
                    className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Icon name="ChevronLeft" size={20} style={{ color: "#fff" } as React.CSSProperties} />
                  </button>
                  <button onClick={() => setGalleryIdx((galleryIdx + 1) % GALLERY_IMAGES.length)}
                    className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Icon name="ChevronRight" size={20} style={{ color: "#fff" } as React.CSSProperties} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20" style={{ background: "var(--c-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>ОТЗЫВЫ КЛИЕНТОВ</div>
            <h2 className="font-black mb-2" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              Что говорят<br /><span style={{ color: "var(--c-accent)" }}>наши клиенты</span>
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400 text-xl">★</span>)}
              </div>
              <span className="text-2xl font-black" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>4.9</span>
              <span className="text-sm" style={{ color: "var(--c-muted)" }}>· 47 отзывов на Яндекс Картах</span>
            </div>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto pb-2 md:overflow-x-visible">
            {REVIEWS.map((r, i) => (
              <div key={i} className="p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:scale-[1.01] flex-shrink-0 md:flex-shrink"
                style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", minWidth: "min(300px, 85vw)" }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ background: "var(--c-accent)", color: "#000", fontFamily: "Oswald, sans-serif" }}>
                    {r.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm" style={{ color: "var(--c-text)" }}>{r.name}</div>
                    <div className="text-xs truncate" style={{ color: "var(--c-muted)" }}>{r.role}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--c-muted)" }}>{r.date}</div>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[...Array(r.stars)].map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                </div>
                <p className="text-sm flex-1" style={{ color: "var(--c-muted)", lineHeight: 1.7 }}>«{r.text}»</p>
                <div className="flex items-center gap-2 pt-2" style={{ borderTop: "1px solid var(--c-border)" }}>
                  <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "#fc3f1d" }}>
                    <span className="text-white font-bold text-xs">Я</span>
                  </div>
                  <span className="text-xs" style={{ color: "var(--c-muted)" }}>Яндекс Карты · проверенный отзыв</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20" style={{ background: "var(--c-bg)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center">
            <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>FAQ</div>
            <h2 className="font-black" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
              ЧАСТЫЕ <span style={{ color: "var(--c-accent)" }}>ВОПРОСЫ</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
                <button className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold"
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
      <section id="contacts" className="py-20" style={{ background: "var(--c-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div>
              <div className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--c-accent)" }}>СВЯЗАТЬСЯ С НАМИ</div>
              <h2 className="font-black mb-8" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--c-text)" }}>
                Получите консультацию<br /><span style={{ color: "var(--c-accent)" }}>технолога</span>
              </h2>
              <div className="flex flex-col gap-4">
                <a href="tel:+74950000000" className="flex items-center gap-3 group"
                  style={{ color: "var(--c-text)", textDecoration: "none" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,107,0,0.1)" }}>
                    <Icon name="Phone" size={18} style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--c-muted)" }}>Телефон</div>
                    <div className="font-semibold group-hover:underline">+7 (495) 000-00-00</div>
                  </div>
                </a>
                <a href="mailto:info@pkzapad.ru" className="flex items-center gap-3 group"
                  style={{ color: "var(--c-text)", textDecoration: "none" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,107,0,0.1)" }}>
                    <Icon name="Mail" size={18} style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--c-muted)" }}>Email</div>
                    <div className="font-semibold group-hover:underline">info@pkzapad.ru</div>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,107,0,0.1)" }}>
                    <Icon name="MapPin" size={18} style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--c-muted)" }}>Производство</div>
                    <div className="font-semibold">г. Москва, ул. Горбунова, 2</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,107,0,0.1)" }}>
                    <Icon name="Clock" size={18} style={{ color: "var(--c-accent)" } as React.CSSProperties} />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--c-muted)" }}>Часы работы</div>
                    <div className="font-semibold">9:00 – 18:00 МСК (Пн–Пт)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="p-8 rounded-2xl" style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)" }}>
              {!conSent ? (
                <>
                  <h3 className="font-bold text-xl mb-1" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>
                    Оставьте заявку
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "var(--c-muted)" }}>Изучим ваш макет и поможем сэкономить до 20% на заказе</p>
                  <div className="flex flex-col gap-3">
                    <StyledInput placeholder="Ваше имя" value={conName} onChange={setConName} error={conErrors.name} />
                    {conErrors.name && <span className="text-xs text-red-400 -mt-2">Введите имя</span>}
                    <PhoneInput value={conPhone} onChange={setConPhone} error={conErrors.phone} />
                    {conErrors.phone && <span className="text-xs text-red-400 -mt-2">Введите корректный номер</span>}
                    <StyledInput placeholder="Название компании" value={conCompany} onChange={setConCompany} />
                    <textarea rows={3} placeholder="Опишите, что нужно (тип упаковки, тираж, сроки)" value={conText}
                      onChange={e => setConText(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl outline-none resize-none text-sm"
                      style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", color: "var(--c-text)" }} />
                    <FileInput onChange={() => {}} />
                    <PrivacyCheck checked={conPrivacy} onChange={setConPrivacy} error={conErrors.privacy} />
                    {conErrors.privacy && <span className="text-xs text-red-400 -mt-2">Необходимо ваше согласие</span>}
                  </div>
                  <button onClick={submitContact} className="w-full mt-5 py-4 rounded-xl font-bold text-black text-base transition-all hover:opacity-90 hover:scale-[1.01]"
                    style={{ background: "var(--c-accent)", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                    ОТПРАВИТЬ ЗАЯВКУ
                  </button>
                  <p className="text-xs text-center mt-3" style={{ color: "var(--c-muted)" }}>Технолог перезвонит в течение 30 минут в рабочее время</p>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-text)" }}>Заявка принята!</h3>
                  <p style={{ color: "var(--c-muted)" }}>Технолог свяжется с вами в течение 30 минут в рабочее время.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center" style={{ background: "var(--c-bg)", borderTop: "1px solid var(--c-border)" }}>
        <div className="font-bold text-xl mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--c-accent)" }}>
          ПК<span style={{ color: "var(--c-text)" }}>ЗАПАД</span>
        </div>
        <div className="text-sm" style={{ color: "var(--c-muted)" }}>© 2026 ПКЗапад. Производство упаковки из картона на заказ. Москва.</div>
      </footer>

      <style>{`
        @keyframes scanline {
          from { transform: translateY(-10px); }
          to { transform: translateY(10px); }
        }
        input::placeholder, textarea::placeholder { color: var(--c-muted); }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}