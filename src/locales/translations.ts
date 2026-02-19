export const translations = {
  en: {
    sidebar: {
      dashboard: "Dashboard",
      intelligenceHub: "Intelligence Hub",
      workflowEngine: "Workflow Engine",
      aiLogs: "AI Logs",
      infrastructure: "Infrastructure",
      nodeManager: "Node Manager",
      operations: "Operations",
      identity: "Identity (IAM)",
      auditTrail: "Audit Trail",
      secretsManager: "Secrets Manager",
      treasury: "Treasury",
      finops: "FinOps",
      analytics: "Analytics",
    },
    headers: {
      deploymentPipeline: "Deployment Pipeline",
      allObjectives: "All Objectives Tracked",
      aiPlatform: "Enterprise AI Platform Online",
      workflowEngine: "Workflow Engine",
      transactionLedger: "Transaction Ledger",
      secretsManager: "Secrets Manager",
    },
    status: {
      active: "Active",
      degraded: "Degraded",
      failed: "Failed",
      pending: "Pending",
      deployed: "Deployed",
      inProgress: "In Progress",
      credit: "Credit",
      debit: "Debit"
    },
    actions: {
      newDeployment: "New Deployment",
      addDeployment: "Add Deployment",
      filter: "Filter",
      copy: "Copy",
      reveal: "Reveal",
      hide: "Hide",
      signOut: "Sign Out"
    },
    modal: {
      projectName: "Project Name",
      environment: "Environment",
      version: "Version",
      prod: "Production",
      dev: "Development",
      cancel: "Cancel",
      submit: "Add Deployment",
      success: "Deployment Success"
    }
  },
  tr: {
    sidebar: {
      dashboard: "Kontrol Paneli",
      intelligenceHub: "Zeka Merkezi",
      workflowEngine: "İş Akışı Motoru",
      aiLogs: "Yapay Zeka Kayıtları",
      infrastructure: "Altyapı",
      nodeManager: "Düğüm Yöneticisi",
      operations: "Operasyonlar",
      identity: "Kimlik (IAM)",
      auditTrail: "Denetim Kaydı",
      secretsManager: "Gizli Anahtarlar",
      treasury: "Hazine",
      finops: "Finansal Operasyonlar",
      analytics: "Analitik",
    },
    headers: {
      deploymentPipeline: "Dağıtım Hattı",
      allObjectives: "Tüm Hedefler Takip Ediliyor",
      aiPlatform: "Kurumsal Yapay Zeka Platformu Aktif",
      workflowEngine: "İş Akışı Motoru",
      transactionLedger: "İşlem Defteri",
      secretsManager: "Gizli Anahtarlar",
    },
    status: {
      active: "Aktif",
      degraded: "Düşük",
      failed: "Başarısız",
      pending: "Beklemede",
      deployed: "Dağıtıldı",
      inProgress: "Devam Ediyor",
      credit: "Alacak",
      debit: "Borç"
    },
    actions: {
      newDeployment: "Yeni Dağıtım",
      addDeployment: "Dağıtımı Ekle",
      filter: "Filtrele",
      copy: "Kopyala",
      reveal: "Göster",
      hide: "Gizle",
      signOut: "Çıkış Yap"
    },
    modal: {
      projectName: "Proje Adı",
      environment: "Ortam",
      version: "Versiyon",
      prod: "Üretim",
      dev: "Geliştirme",
      cancel: "İptal",
      submit: "Dağıtımı Ekle",
      success: "Dağıtım Başarılı"
    }
  }
} as const;
