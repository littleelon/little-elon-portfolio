// ✏️ EDIT YOUR DETAILS HERE
const CONFIG = {
  brand: "Little Elon",
  email: "littleelon01@gmail.com",
  phone: "09036448225",
  whatsapp: "2349036448225"   // country code (234) + number without the first 0
};

// Fill in your details everywhere
document.querySelectorAll("[data-b]").forEach(el => {
  el.textContent = CONFIG[el.dataset.b];
});
document.getElementById("mail").href = "mailto:" + CONFIG.email;
document.getElementById("tel").href = "https://wa.me/" + CONFIG.whatsapp;
document.getElementById("yr").textContent = new Date().getFullYear();
document.title = CONFIG.brand + " | Web Design, Graphics, GBP & Local SEO";

// Sticky header + mobile menu
const hdr = document.getElementById("hdr");
const menu = document.getElementById("menu");
addEventListener("scroll", () => hdr.classList.toggle("solid", scrollY > 40), { passive: true });
document.getElementById("burger").onclick = () => menu.classList.toggle("open");
menu.querySelectorAll("a").forEach(a => a.onclick = () => menu.classList.remove("open"));

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Counters
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    co.unobserve(e.target);
    const target = +e.target.dataset.count;
    let n = 0;
    const timer = setInterval(() => {
      n++;
      e.target.textContent = n;
      if (n >= target) clearInterval(timer);
    }, 120);
  });
});
document.querySelectorAll("[data-count]").forEach(el => co.observe(el));

// Portfolio filter
const buttons = document.querySelectorAll("#filters button");
const projects = document.querySelectorAll(".proj");
buttons.forEach(btn => {
  btn.onclick = () => {
    buttons.forEach(b => b.classList.remove("on"));
    btn.classList.add("on");
    const f = btn.dataset.f;
    projects.forEach(p => p.classList.toggle("hide", f !== "all" && p.dataset.cat !== f));
  };
});

// Contact form -> WhatsApp
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  const v = n => f[n].value.trim();
  let ok = true;
  const setErr = (key, msg) => {
    f.querySelector('[data-e="' + key + '"]').textContent = msg;
    if (msg) ok = false;
  };
  setErr("name", v("name").length < 2 ? "Please enter your name" : "");
  setErr("email", !/^\S+@\S+\.\S+$/.test(v("email")) ? "Enter a valid email" : "");
  setErr("message", v("message").length < 10 ? "Tell me a bit more (10+ characters)" : "");
  if (!ok) return;

  const text = encodeURIComponent(
    "Hi " + CONFIG.brand + ", I'm " + v("name") + ".\n" +
    "Service: " + v("service") + "\n" +
    "Email: " + v("email") + "\n\n" + v("message")
  );
  window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + text, "_blank");
});