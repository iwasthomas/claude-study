// ===== 개인 정보 데이터 (이 부분만 수정하면 됩니다) =====
const profile = {
  name: "홍길동",
  nameEn: "HONG GIL DONG",
  role: "프론트엔드 개발자",
  intro: "사용자 경험을 중요하게 생각하는 프론트엔드 개발자입니다.\n깔끔한 코드와 보기 좋은 화면을 만드는 것을 좋아합니다.\n새로운 기술을 배우고 적용하는 과정을 즐깁니다.",
  email: "example@gmail.com",
  github: "https://github.com/your-id",
  info: [
    ["소속", "개인 프로젝트"],
    ["위치", "서울, 대한민국"],
    ["경력", "신입 (1년 미만)"],
    ["이메일", "example@gmail.com"],
  ],
  stats: [
    ["경력", "1년"],
    ["프로젝트", "3개"],
    ["기술", "6개"],
    ["학습", "진행 중"],
  ],
  career: [
    { period: "2025 - 현재", title: "프론트엔드 개발 학습", desc: "HTML, CSS, JavaScript 기반 웹 개발 학습 및 개인 프로젝트 진행" },
    { period: "2024", title: "웹 개발 입문", desc: "웹 기초 과정 수료 및 첫 정적 페이지 제작" },
  ],
  skills: [
    { name: "HTML", category: "마크업", level: 90 },
    { name: "CSS / Tailwind", category: "스타일", level: 85 },
    { name: "JavaScript", category: "로직", level: 75 },
    { name: "Git / GitHub", category: "협업", level: 70 },
    { name: "React", category: "프레임워크", level: 50 },
  ],
  projects: [
    {
      title: "버킷 리스트 앱",
      desc: "목표를 추가하고 완료 여부를 관리하는 할 일 목록 웹앱입니다.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/your-id/bucket-list",
    },
    {
      title: "포트폴리오 사이트",
      desc: "Tailwind CSS로 만든 반응형 개인 소개 페이지입니다.",
      tags: ["HTML", "Tailwind CSS"],
      link: "https://github.com/your-id/profile",
    },
    {
      title: "날씨 대시보드",
      desc: "공개 API로 도시별 날씨를 조회하고 보여주는 화면입니다.",
      tags: ["JavaScript", "Fetch API"],
      link: "https://github.com/your-id/weather",
    },
  ],
};

// ===== 렌더링 =====
const $ = (selector) => document.querySelector(selector);

function renderHero() {
  $("#hero-role").textContent = profile.role;
  $("#hero-name").textContent = profile.name;
  $("#hero-name-en").textContent = profile.nameEn;
  $("#hero-intro").textContent = profile.intro;
  $("#info-panel").innerHTML = profile.info
    .map(
      ([label, value]) => `
        <div class="flex gap-4 px-5 py-3 text-sm">
          <dt class="w-16 shrink-0 font-bold text-brand">${label}</dt>
          <dd class="text-zinc-200">${value}</dd>
        </div>`
    )
    .join("");
}

function renderStats() {
  $("#stats").innerHTML = profile.stats
    .map(
      ([label, value]) => `
        <li class="py-6 text-center">
          <p class="text-xs text-zinc-500">${label}</p>
          <p class="mt-1 font-display text-2xl text-brand">${value}</p>
        </li>`
    )
    .join("");
}

function renderAbout() {
  $("#tab-intro").textContent = profile.intro;
  $("#tab-career").innerHTML = profile.career
    .map(
      (item) => `
        <li class="border-l-2 border-brand pl-5">
          <p class="text-sm font-bold text-brand">${item.period}</p>
          <p class="mt-1 font-bold">${item.title}</p>
          <p class="mt-1 text-sm text-zinc-600">${item.desc}</p>
        </li>`
    )
    .join("");
}

function renderSkills() {
  $("#skills-body").innerHTML = profile.skills
    .map(
      (skill) => `
        <tr>
          <td class="px-4 py-4 font-bold">${skill.name}</td>
          <td class="px-4 py-4 text-zinc-600">${skill.category}</td>
          <td class="px-4 py-4">
            <div class="level-bar"><span style="width: ${skill.level}%"></span></div>
          </td>
        </tr>`
    )
    .join("");
}

function renderProjects() {
  $("#project-grid").innerHTML = profile.projects
    .map(
      (project) => `
        <article class="reveal flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
          <div class="pinstripe flex h-36 items-center justify-center bg-brand-dark font-display text-2xl text-white">
            ${project.title}
          </div>
          <div class="flex flex-1 flex-col p-6">
            <h3 class="font-bold">${project.title}</h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">${project.desc}</p>
            <ul class="mt-4 flex flex-wrap gap-2">
              ${project.tags.map((tag) => `<li class="rounded bg-zinc-100 px-2 py-1 text-xs font-medium">${tag}</li>`).join("")}
            </ul>
            <a href="${project.link}" target="_blank" rel="noopener" class="mt-5 text-sm font-bold text-brand hover:underline">자세히보기 &gt;</a>
          </div>
        </article>`
    )
    .join("");
}

function renderContact() {
  $("#contact-email").href = `mailto:${profile.email}`;
  $("#contact-github").href = profile.github;
  $("#year").textContent = new Date().getFullYear();
  $("#footer-name").textContent = profile.name;
}

// ===== 인터랙션 =====
function setupMobileMenu() {
  const btn = $("#menu-btn");
  const menu = $("#mobile-menu");
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => menu.classList.add("hidden"))
  );
}

function setupTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("tab-active"));
      btn.classList.add("tab-active");

      document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.add("hidden"));
      $(`#tab-${btn.dataset.tab}`).classList.remove("hidden");
    });
  });
}

function setupHeaderAndActiveLink() {
  const header = $("#header");
  const links = document.querySelectorAll(".nav-link");

  const onScroll = () => {
    header.classList.toggle("shadow-md", window.scrollY > 10);

    let current = "";
    document.querySelectorAll("section[id]").forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function setupReveal() {
  const targets = document.querySelectorAll("#about, #skills, #projects, #contact");
  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ===== 시작 =====
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderStats();
  renderAbout();
  renderSkills();
  renderProjects();
  renderContact();

  setupMobileMenu();
  setupTabs();
  setupHeaderAndActiveLink();
  setupReveal();
});
