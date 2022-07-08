import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import EditUser from '../views/user/EditUser.vue';
import NewUserView from '../views/NewUserView.vue'
import StockMarketListView from '../views/StockMarketListView.vue'
import StockSecuritiesView from '../views/StockSecuritiesView.vue';
import SecuritiesView from '../views/SecuritiesView.vue';
import AddCompanyEmployee from '../views/AddCompanyEmployee.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView
      redirect: '/login'
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/newUser',
      name: 'newUser',
      component: NewUserView
    },
    {
      path: '/stockMarketList',
      name: 'stockMarketList',
      component: StockMarketListView
    },
    {
      path: '/admin/users',
      name: 'users',
      component: () => import('../views/UserSearch.vue')
    },
    {
      path: '/addPassword/',
      name: 'addPassword',
      component: () => import('../views/AddPassword.vue')
    },
    {
      path: '/users/:id',
      name: 'userEdit',
      component: () => EditUser
    },
    {
      path: '/stock/:symbol',
      name: 'stockInfo',
      component: () => import('../views/StockSecurityInfoView.vue'),
      props: route => ({ query: route.query.q })
    },
    {
      path: '/currency/:id',
      name: 'currencyInfo',
      component: () => import('../views/TransactionsForCurrencyView.vue')
    },
    {
      path: '/stock-tabledemo',
      name: 'StockTableDemo',
      component: () => import('../views/StockTableDemo.vue')
    },
    {
      path: '/AddCompanyEmployee',
      name: 'AddCompanyEmployee',
      component: AddCompanyEmployee
    },
    {
      path: '/StockSecuritiesView',
      name: 'StockSecuritiesView',
      component: StockSecuritiesView
    },
    {
      path: '/addCompanyInformation',
      name: 'addCompanyInformation',
      component: () => import('../views/AddCompanyInformation.vue')
    },
    {
      path: '/SecuritiesView',
      name: 'SecuritiesView',
      component: SecuritiesView
    },
    {
      path: '/orders',
      name: 'OrderHistory',
      component: () => import('../views/OrderHistory.vue')
    },
    {
      path: '/createContract',
      name: 'CreateContract',
      component: () => import('../views/CreateContract.vue')
    },
    {
      path: '/addcompanybankaccount',
      name: 'AddCompanyBankAccount',
      component: () => import('../views/AddCompanyBankAccount.vue')
    },
    {
      path: '/companies',
      name: 'Companies',
      component: () => import('../views/CompanyList.vue')
    },
    {
      path: '/company/:id',
      name: 'Company',
      component: () => import('../views/SingleCompanyView.vue')
    },
    {
      path: '/contracts',
      name: 'Contracts',
      component: () => import('../views/ContractsView.vue')
    },
    {
      path: '/contract/:id',
      name: 'Contract',
      component: () => import('../views/SingleContractView.vue')
    }
  ]
})

const routeNames = [
  'admin', 
  'newUser', 
  'stockMarketList', 
  'stockMarketList', 
  'users', 
  'addPassword', 
  'userEdit', 
  'stockInfo', 
  'currencyInfo',
  'StockTableDemo', 
  'AddCompanyEmployee',
  'StockSecuritiesView',
  'addCompanyInformation',
  'SecuritiesView',
  'OrderHistory',
  'CreateContract',
  'AddCompanyBankAccount',
  'Companies',
  'Company',
  'Contracts',
  'SingleContractView',
  'Contract'
]

router.beforeEach((to, from, next) => {
  if (routeNames.includes(to.name)) {
    const token = localStorage.getItem('token');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  } else if (to.name === 'login') {
    const token = localStorage.getItem('token');
    if (token) {
      next('/admin');
    } else {
      next();
    }
  }
})

export default router
