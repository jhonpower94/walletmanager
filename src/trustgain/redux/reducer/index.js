//import { reactLocalStorage } from "reactjs-localstorage";
import { combineReducers } from "redux";
//import { Strings } from "../../lang/language";

/*
const languageSelected = (state = Strings, action) => {
  const newState = { ...action.payload };
  switch (action.type) {
    case "LANGUAGE":
      return newState;
    default:
      return state;
  }
};


const darkMode = (state = reactLocalStorage.get("darkmode", false), action) => {
  switch (action.type) {
    case "DARKMODE":
      return !state;
    default:
      return state;
  }
};



const pathname = (
  state = reactLocalStorage.get("pathname", "/dashboard/account/balance"),
  action
) => {
  switch (action.type) {
    case "PATHNAME":
      return action.payload;
    default:
      return state;
  }
};

*/

const loading = (state = { loading: false }, action) => {
  const newLoadState = { ...state, loading: !state.loading };
  const stoploading = { ...state, loading: action.payload };
  switch (action.type) {
    case "LOADING":
      return newLoadState;
    case "STOPLOADING":
      return stoploading;
    default:
      return state;
  }
};
const loadingPayment = (state = { loading: false }, action) => {
  const newLoadState = { ...state, loading: !state.loading };
  switch (action.type) {
    case "LOADINGPAYMENT":
      return newLoadState;
    default:
      return state;
  }
};
const blocks = (state = { data: [] }, action) => {
  const newBlock = { ...state, data: action.payload };
  switch (action.type) {
    case "BLOCKS":
      return newBlock;
    default:
      return state;
  }
};

const activities = (
  state = {
    totlProfit: 0,
    bonusTotalRecieved: 0,
    totalDeposit: 0,
    totalwithdrawn: 0,
  },
  action
) => {
  const profits = { ...state, totlProfit: action.payload };
  const totaldeposit = { ...state, totalDeposit: action.payload };
  const totalwithdraw = { ...state, totalwithdrawn: action.payload };
  const totalBonus = { ...state, bonusTotalRecieved: action.payload };
  switch (action.type) {
    case "PROFITS":
      return profits;
    case "DEPOSIT":
      return totaldeposit;
    case "WITHDRAW":
      return totalwithdraw;
    case "BONUSTOTAL":
      return totalBonus;
    default:
      return state;
  }
};

const bonus = (state = { bonus: [], length: 0 }, action) => {
  const newCollection = { ...state, bonus: action.payload };
  switch (action.type) {
    case "BONUSCOLLECTION":
      return newCollection;
    case "AVAILABLEBONUS":
      return { ...state, length: action.payload };
    default:
      return state;
  }
};

const balance = (state = { main_balance: 0, bonus_balance: 0 }, action) => {
  const main = { ...state, main_balance: action.payload };
  const bonus = { ...state, bonus_balance: action.payload };
  switch (action.type) {
    case "MAINBALANCE":
      return main;
    case "BONUSBALANCE":
      return bonus;
    default:
      return state;
  }
};

const investment = (state = { trades: [], length: 0 }, action) => {
  const newInvest = { ...state, trades: action.payload };
  switch (action.type) {
    case "INVESTMENT":
      return newInvest;
    case "AVAILABLEINVESTMENT":
      return { ...state, length: action.payload };
    default:
      return state;
  }
};
const notifications = (state = [], action) => {
  const newNoty = action.payload;
  switch (action.type) {
    case "NOTIFICATION":
      return newNoty;
    case "CLEARNOTIFICATION":
      return [];
    default:
      return state;
  }
};

const selectetedmenu = (state = { number: 0 }, action) => {
  const select = { ...state, number: action.payload };
  switch (action.type) {
    case "SELECTED":
      return select;
    default:
      return state;
  }
};

const trxinfo = (state = {}, action) => {
  const txinfo = { ...state, ...action.payload };
  switch (action.type) {
    case "TRXNS":
      return txinfo;
    default:
      return state;
  }
};

const walletTransactions = (state = [], action) => {
  // const trx = [...state, action.payload];
  switch (action.type) {
    case "WALLET":
      return action.payload;
    default:
      return state;
  }
};

const useInfos = (state = { totalBalance: 0 }, action) => {
  const setinfo = { ...state, ...action.payload };
  switch (action.type) {
    case "USERIFO":
      return setinfo;
    default:
      return state;
  }
};

const savingsInfos = (state = {}, action) => {
  const setinfo = { ...state, ...action.payload };
  switch (action.type) {
    case "SAVINGS":
      return setinfo;
    default:
      return state;
  }
};

const checkingsInfos = (state = {}, action) => {
  const setinfo = { ...state, ...action.payload };
  switch (action.type) {
    case "CHECKINGS":
      return setinfo;
    default:
      return state;
  }
};

const totalTransactions = (state = 0, action) => {
  const setinfo = action.payload;
  switch (action.type) {
    case "TOTALTRANSACTION":
      return setinfo;
    default:
      return state;
  }
};

const totalTransactionsType = (
  state = {
    savings: [],
    checkings: [],
  },
  action
) => {
  const setsavings = { ...state, savings: action.payload };
  const setchekings = { ...state, checkings: action.payload };
  switch (action.type) {
    case "TRNSSAVINGS":
      return setsavings;
    case "TRANSCHECKINGS":
      return setchekings;
    default:
      return state;
  }
};

const currentLocation = (state = "account", action) => {
  switch (action.type) {
    case "LOCATION":
      return action.payload;
    default:
      return state;
  }
};

const walletInfos = (
  state = {
    binancecoin: {
      usd: 0,
      usd_24h_change: 0,
      balance: 0,
    },
    bitcoin: {
      usd: 0,
      usd_24h_change: 0,
      balance: 0,
    },
    ethereum: {
      usd: 0,
      usd_24h_change: 0,
      balance: 0,
    },
    tether: {
      usd: 1.001,
      usd_24h_change: 0,
      balance: 0,
    },
    tron: {
      usd: 0,
      usd_24h_change: 0,
      balance: 0,
    },
  },
  action
) => {
  const setCryptos = { ...state, ...action.payload };
  switch (action.type) {
    case "WALLET":
      return setCryptos;
    default:
      return state;
  }
};

const walletsData = (state = [], action) => {
  switch (action.type) {
    case "WALLETFULLDATA":
      return action.payload;
    default:
      return state;
  }
};

export const allreducer = combineReducers({
  //  language: languageSelected,
  // darkMode: darkMode,
  loading: loading,
  loadingpayment: loadingPayment,
  blocks: blocks,
  balance: balance,
  activities: activities,
  bonus: bonus,
  investment: investment,
  notification: notifications,

  selectetedmenu: selectetedmenu,
  trxinfo: trxinfo,
  walletTransactions: walletTransactions,

  useInfos: useInfos,
  savingsInfos: savingsInfos,
  checkingsInfos: checkingsInfos,
  totalTransactions: totalTransactions,
  totalTransactionsType: totalTransactionsType,
  currentLocation: currentLocation,
  // pathname: pathname,
  walletInfos: walletInfos,
  walletsData: walletsData,
});
