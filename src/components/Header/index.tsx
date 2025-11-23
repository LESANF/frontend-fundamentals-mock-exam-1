import { NavigationBar } from 'tosslib';

interface HeaderProps {
  title?: string;
  rightButton?: React.ReactNode;
  leftButton?: React.ReactNode;
}

const Header = ({ title, rightButton, leftButton }: HeaderProps) => {
  return <NavigationBar title={title} right={rightButton} left={leftButton} />;
};
export default Header;
