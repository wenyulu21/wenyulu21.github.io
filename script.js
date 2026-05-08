const translations = {
  zh: {
    "nav.about": "关于我",
    "nav.education": "教育经历",
    "nav.publications": "论文与成果",
    "nav.news": "动态",
    "profile.name": "陆汶雨",
    "profile.role": "硕士研究生",
    "profile.school": "南京中医药大学",
    "profile.locationTitle": "地点",
    "profile.locationRegion": "中国 · 江苏省 · 南京市",
    "profile.locationDetail": "栖霞区仙林大道138号南京中医药大学",
    "profile.emailTitle": "邮箱",
    "profile.interestsTitle": "兴趣",
    "profile.interest1": "人工智能药物设计",
    "profile.interest2": "中医药人工智能",
    "about.title": "关于我",
    "about.p1": "我是南京中医药大学中医药人工智能专业硕士研究生三年级在读，研究方向为人工智能药物设计。",
    "about.p2": "本科毕业于南京中医药大学计算机科学与技术专业，具备计算机科学与中医药交叉学习背景。",
    "about.p3": "目前关注机器学习与药物发现方法在中医药现代化研究中的应用。",
    "education.title": "教育经历",
    "education.masterTime": "硕士在读",
    "education.masterTitle": "南京中医药大学",
    "education.masterDesc": "中医药人工智能专业 · 硕士研究生三年级",
    "education.bachelorTime": "本科",
    "education.bachelorTitle": "南京中医药大学",
    "education.bachelorDesc": "计算机科学与技术专业",
    "publications.title": "论文与成果",
    "news.title": "动态",
    "news.item1Date": "2026年5月8日",
    "news.item1Desc": "个人主页创建。"
  },
  en: {
    "nav.about": "About",
    "nav.education": "Education",
    "nav.publications": "Publications",
    "nav.news": "News",
    "profile.name": "Wenyu Lu",
    "profile.role": "Master Student",
    "profile.school": "Nanjing University of Chinese Medicine",
    "profile.locationTitle": "Location",
    "profile.locationRegion": "China · Jiangsu Province · Nanjing",
    "profile.locationDetail": "Nanjing University of Chinese Medicine, No. 138 Xianlin Avenue, Qixia District",
    "profile.emailTitle": "Email",
    "profile.interestsTitle": "Interests",
    "profile.interest1": "AI-driven Drug Design",
    "profile.interest2": "AI for Traditional Chinese Medicine",
    "about.title": "About",
    "about.p1": "I am a third-year master's student in Artificial Intelligence of Traditional Chinese Medicine at Nanjing University of Chinese Medicine, focusing on AI-driven drug design.",
    "about.p2": "I obtained my bachelor's degree in Computer Science and Technology from Nanjing University of Chinese Medicine, with interdisciplinary training in computing and TCM.",
    "about.p3": "My current interests include applying machine learning and drug discovery methods to the modernization of traditional Chinese medicine.",
    "education.title": "Education",
    "education.masterTime": "Master",
    "education.masterTitle": "Nanjing University of Chinese Medicine",
    "education.masterDesc": "Artificial Intelligence of Traditional Chinese Medicine · Third-year Master's Student",
    "education.bachelorTime": "Bachelor",
    "education.bachelorTitle": "Nanjing University of Chinese Medicine",
    "education.bachelorDesc": "Computer Science and Technology",
    "publications.title": "Publications",
    "news.title": "News",
    "news.item1Date": "May 8, 2026",
    "news.item1Desc": "Personal homepage created."
  }
};

const toggle = document.querySelector(".lang-toggle");
const currentLabel = document.querySelector(".lang-current");
const profileTabs = document.querySelectorAll("[data-profile-tab]");
const profilePanels = document.querySelectorAll("[data-profile-panel]");
const navLinks = document.querySelectorAll(".nav-links a");
const pageSections = document.querySelectorAll(".content .section");
let currentLanguage = "zh";

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  currentLabel.textContent = language === "zh" ? "EN" : "中文";
  toggle.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换到中文");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[language][key] || element.textContent;
  });
}

function setProfilePanel(panelName) {
  profileTabs.forEach((tab) => {
    const isActive = tab.dataset.profileTab === panelName;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
  });

  profilePanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.profilePanel === panelName);
  });
}

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
  });
}

function updateActiveNavFromScroll() {
  const headerOffset = 130;
  let currentSection = pageSections[0]?.id;
  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

  if (nearBottom && pageSections.length > 0) {
    setActiveNav(pageSections[pageSections.length - 1].id);
    return;
  }

  pageSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= headerOffset) {
      currentSection = section.id;
    }
  });

  if (currentSection) {
    setActiveNav(currentSection);
  }
}

toggle.addEventListener("click", () => {
  setLanguage(currentLanguage === "zh" ? "en" : "zh");
});

profileTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setProfilePanel(tab.dataset.profileTab);
  });
});

window.addEventListener("scroll", updateActiveNavFromScroll, { passive: true });
window.addEventListener("resize", updateActiveNavFromScroll);

setLanguage("en");
setProfilePanel("location");
updateActiveNavFromScroll();
