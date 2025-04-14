import { Link, useNavigation } from 'react-router';
import { dashboardLinks } from '../constants';

export const DashBoard = () => {
  const navigation = useNavigation();

  return (
    <div className="flex flex-wrap justify-center items-center h-full gap-5">
      {dashboardLinks.map((link) => (
        <Link
          to={link.link}
          key={link.title}
          className={
            'cursor-pointer min-w-50 flex flex-col justify-center items-center gap-4 border-2 p-4 rounded-2xl hover:bg-gray-100 bg-white dark:bg-gray-600  dark:hover:bg-gray-500 ' +
            `${navigation.state === 'loading' && 'pointer-events-none animate-pulse bg-gray-400 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-600'}`
          }
        >
          <img src={'images/' + link.img} alt={link.title} className="h-20" />
          <h2 className="text-2xl">{link.title}</h2>
        </Link>
      ))}
    </div>
  );
};
