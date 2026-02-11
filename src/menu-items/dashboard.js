// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'dashboard',
  title: '',
  caption: 'Dashboard',
  icon: NavigationOutlinedIcon,
  type: 'group',
  children: [
    {
      id: 'dashboards',
      title: 'Dashboard',
      type: 'collapse',
      icon: HomeOutlinedIcon,
      children: [
        {
          id: 'user_report',
          title: 'User Reports',
          type: 'item',
          icon: OutlinedFlagIcon,
          url: '/user_report',
          breadcrumbs: false
        },
        {
          id: 'support_analyst_report',
          title: 'Support Analyst Reports',
          type: 'item',
          icon: AnalyticsOutlinedIcon,
          url: '/support_analyst_report',
          breadcrumbs: false
        },
        {
          id: 'specifications',
          title: 'Specifications',
          type: 'item',
          icon: InfoOutlinedIcon,
          url: '/specifications',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'admin_user',
      title: 'Admin Users',
      type: 'item',
      icon: Person2OutlinedIcon,
      url: '/admin_user',
      breadcrumbs: false
    },
    {
      id: 'accounts',
      title: 'Accounts',
      type: 'item',
      icon: ManageAccountsOutlinedIcon,
      url: '/accounts',
      breadcrumbs: false
    },
    {
      id: 'content',
      title: 'Landing Page Contents',
      type: 'item',
      icon: SourceOutlinedIcon,
      url: '/content',
      breadcrumbs: false
    },
    {
      id: 'user_request',
      title: 'User Requests',
      type: 'item',
      icon: Person2OutlinedIcon,
      url: '/user_request',
      breadcrumbs: false
    },
    {
      id: 'about_us',
      title: 'About Us',
      type: 'item',
      icon: InfoOutlinedIcon,
      url: '/about_us',
      breadcrumbs: false
    },
    {
      id: 'privacy_policies',
      title: 'Privacy Policies',
      type: 'item',
      icon: ShieldOutlinedIcon,
      url: '/privacy_policies',
      breadcrumbs: false
    },
    {
      id: 'articles',
      title: 'Articles',
      type: 'item',
      icon: ArticleOutlinedIcon,
      url: '/articles',
      breadcrumbs: false
    },
    {
      id: 'master_prompts',
      title: 'Master Prompts',
      type: 'item',
      icon: PersonSearchOutlinedIcon,
      url: '/master_prompts',
      breadcrumbs: false
    },
    {
      id: 'prompts',
      title: 'Prompts',
      type: 'item',
      icon: SearchOutlinedIcon,
      url: '/prompts',
      breadcrumbs: false
    },
    {
      id: 'provisional_specification',
      title: 'Provisional Specifications',
      type: 'item',
      icon: InfoOutlinedIcon,
      url: '/provisional_specification',
      breadcrumbs: false
    },
    {
      id: 'term_condition',
      title: 'Terms and Condition',
      type: 'item',
      icon: AcUnitOutlinedIcon,
      url: '/term_condition',
      breadcrumbs: false
    }
  ]
};

export default dashboard;
