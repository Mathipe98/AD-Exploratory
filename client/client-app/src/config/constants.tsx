import ListImages from '../components/ListImages';
import Login from '../components/Login';
import Menu from '../components/Menu';
import ModifyImage from '../components/ModifyImage';
import RegisterImage from '../components/RegisterImage';
import RegisterUser from '../components/RegisterUser';
import SearchImages from '../components/SearchImages';
import { Endpoint } from '../types/NavBarTypes';

const LOGIN_ENDPOINT: Endpoint = {
  displayName: 'Login',
  route: '/login',
  component: Login
};

const REGISTER_ENDPOINT: Endpoint = {
  displayName: 'Register User',
  route: '/register-user',
  component: RegisterUser
};

const MENU_ENDPOINT: Endpoint = {
  displayName: 'Menu',
  route: '/menu',
  component: Menu
};

const GENERIC_CLIENT_ENDPOINTS: Endpoint[] = [
  {
    displayName: 'Register Image',
    route: '/register-image',
    component: RegisterImage
  },
  {
    displayName: 'List Images',
    route: '/list-images',
    component: ListImages
  },
  {
    displayName: 'Modify Image',
    route: '/modify-image',
    component: ModifyImage
  },
  {
    displayName: 'Search Images',
    route: '/search-images',
    component: SearchImages
  }
];

const API_BASE = 'http://0.0.0.0:8080/RestADServer4';

const SERVER_ENDPOINTS = {
  pingUrl: `${API_BASE}/api/ping`,
  registerUserUrl: `${API_BASE}/api/user/register`,
  loginUrl: `${API_BASE}/api/user/login`,
  registerImageUrl: `${API_BASE}/api/image/register`,
  updateImageUrl: `${API_BASE}/api/image/update`,
  listImagesUrl: `${API_BASE}/api/image/list`,
  modifyImagesUrl: `${API_BASE}/api/image/update`,
  deleteImageUrl: `${API_BASE}/api/image/delete`,
  searchById: `${API_BASE}/api/image/searchID`,
  searchByTitle: `${API_BASE}/api/image/searchTitle`,
  searchByCreationDate: `${API_BASE}/api/image/searchCreationDate`,
  searchByAuthor: `${API_BASE}/api/image/searchAuthor`,
  searchByKeywords: `${API_BASE}/api/image/searchKeywords`
};

export {
  GENERIC_CLIENT_ENDPOINTS,
  LOGIN_ENDPOINT,
  MENU_ENDPOINT,
  REGISTER_ENDPOINT,
  SERVER_ENDPOINTS
};
