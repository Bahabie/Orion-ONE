export const translations = {
  en: {
    common: {
      active: "Active",
      inactive: "Inactive",
      degraded: "Degraded",
      offline: "Offline",
      pending: "Pending",
      deployed: "Deployed",
      inProgress: "In Progress",
      failed: "Failed",
    },
    status: {
      active: "Active",
      degraded: "Degraded",
      failed: "Failed",
      inProgress: "In Progress",
    },
    finops: {
      header: {
        title: "Financial Operations",
        subtitle: "Optimize your cloud spend and efficiency.",
      },
      resources: {
        title: "Resource Metrics",
        resource: "Resource",
        dailyBurn: "Daily Burn",
        monthlyEstimate: "Monthly Estimate",
        unitCost: "Unit Cost",
        efficiency: "Efficiency",
      },
      allocation: {
        title: "Cost Allocation",
        api: "AI Services",
        compute: "Compute",
        storage: "Storage",
        networking: "Networking",
      },
    },
    operations: {
      title: "Active Deployments",
      deployed: "Deployed",
      inProgress: "In Progress",
      failed: "Failed",
      stats: {
        active: "Active Deployments",
        inProgress: "In Progress",
        failed: "Failed",
      },
    },
    nodeManager: {
      title: "Node Manager",
      active: "Active",
      degraded: "Degraded",
      offline: "Offline",
    },
    iam: {
      active: "Active",
      inactive: "Inactive",
    },
  },
  tr: {
    common: {
      active: "Aktif",
      inactive: "Pasif",
      degraded: "Düşük Performans",
      offline: "Çevrimdışı",
      pending: "Beklemede",
      deployed: "Dağıtıldı",
      inProgress: "Devam Ediyor",
      failed: "Başarısız",
    },
    status: {
      active: "Aktif",
      degraded: "Düşük Performans",
      failed: "Başarısız",
      inProgress: "Devam Ediyor",
    },
    finops: {
      header: {
        title: "Finansal Operasyonlar",
        subtitle: "Bulut harcamalarınızı ve verimliliğinizi optimize edin.",
      },
      resources: {
        title: "Kaynak Metrikleri",
        resource: "Kaynak",
        dailyBurn: "Günlük Harcama",
        monthlyEstimate: "Aylık Tahmin",
        unitCost: "Birim Maliyeti",
        efficiency: "Verimlilik",
      },
      allocation: {
        title: "Maliyet Dağılımı",
        api: "Yapay Zeka Hizmetleri",
        compute: "Hesaplama",
        storage: "Depolama",
        networking: "Ağ",
      },
    },
    operations: {
      title: "Aktif Dağıtımlar",
      deployed: "Dağıtıldı",
      inProgress: "Devam Ediyor",
      failed: "Başarısız",
      stats: {
        active: "Aktif Dağıtımlar",
        inProgress: "Devam Ediyor",
        failed: "Başarısız",
      },
    },
    nodeManager: {
      title: "Düğüm Yöneticisi",
      active: "Aktif",
      degraded: "Düşük Performans",
      offline: "Çevrimdışı",
    },
    iam: {
      active: "Aktif",
      inactive: "Pasif",
    },
  },
};

export const t = (key: string, language: "en" | "tr" = "en"): string => {
  const keys = key.split(".");
  let result: any = translations[language];
  for (const k of keys) {
    result = result[k];
    if (!result) return key;
  }
  return String(result);
};
