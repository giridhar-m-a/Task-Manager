import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

const ApplistCard: React.FC<{
  name: string;
  icon: React.ReactNode;
  url: string;
  className?: string;
}> = ({ name, icon, url, className }) => {
  return (
    <Link to={url}>
      <Card className={cn(className, 'w-44 shadow-md')}>
        <CardHeader>
          <CardTitle className="text-center">{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">{icon}</CardContent>
      </Card>
    </Link>
  );
};
export default ApplistCard;
