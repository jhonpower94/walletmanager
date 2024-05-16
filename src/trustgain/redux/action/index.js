export const language$ = (data) => {
  return {
    type: "LANGUAGE",
    payload: data,
  };
};
export const darkmode$ = () => {
  return {
    type: "DARKMODE",
  };
};
export const loading$ = () => {
  return {
    type: "LOADING",
  };
};
export const stopload$ = (data) => {
  return {
    type: "STOPLOADING",
    payload: data,
  };
};
export const loadingpayment$ = () => {
  return {
    type: "LOADINGPAYMENT",
  };
};

export const blocks$ = (data) => {
  return {
    type: "BLOCKS",
    payload: data,
  };
};

export const totalprofit$ = (data) => {
  return {
    type: "PROFITS",
    payload: data,
  };
};
export const totaldeposit$ = (data) => {
  return {
    type: "DEPOSIT",
    payload: data,
  };
};
export const totalwithdrawn$ = (data) => {
  return {
    type: "WITHDRAW",
    payload: data,
  };
};
export const totalbonusearned$ = (data) => {
  return {
    type: "BONUSTOTAL",
    payload: data,
  };
};

export const bonusCollections$ = (data) => {
  return {
    type: "BONUSCOLLECTION",
    payload: data,
  };
};
export const availableBonus$ = (data) => {
  return {
    type: "AVAILABLEBONUS",
    payload: data,
  };
};
export const mainbalance$ = (data) => {
  return {
    type: "MAINBALANCE",
    payload: data,
  };
};
export const bonusbalance$ = (data) => {
  return {
    type: "BONUSBALANCE",
    payload: data,
  };
};

export const myinvestment$ = (data) => {
  return {
    type: "INVESTMENT",
    payload: data,
  };
};

export const availableInvestment$ = (data) => {
  return {
    type: "AVAILABLEINVESTMENT",
    payload: data,
  };
};

export const notification$ = (data) => {
  return {
    type: "NOTIFICATION",
    payload: data,
  };
};

export const clearnotification$ = (data) => {
  return {
    type: "CLEARNOTIFICATION",
    payload: data,
  };
};

export const userinfo$ = (data) => {
  return {
    type: "USERIFO",
    payload: data,
  };
};

export const savingsinfo$ = (data) => {
  return {
    type: "SAVINGS",
    payload: data,
  };
};

export const checkingsinfo$ = (data) => {
  return {
    type: "CHECKINGS",
    payload: data,
  };
};

export const totaltransaction$ = (data) => {
  return {
    type: "TOTALTRANSACTION",
    payload: data,
  };
};

export const totaltransactionsavings$ = (data) => {
  return {
    type: "TRNSSAVINGS",
    payload: data,
  };
};

export const totaltransactioncheckings$ = (data) => {
  return {
    type: "TRANSCHECKINGS",
    payload: data,
  };
};

export const currentLocation$ = (data) => {
  return {
    type: "LOCATION",
    payload: data,
  };
};

export const walletInfos$ = (data) => {
  return {
    type: "WALLET",
    payload: data,
  };
};

export const walletData$ = (data) => {
  return {
    type: "WALLETFULLDATA",
    payload: data,
  };
};
