import SidebarContent from './sidebar-content';

const SidebarDesktop = () => {
  return (
    <div className='hidden lg:block'>
      <div className='fixed inset-y-0 w-80'>
        <SidebarContent />
      </div>
      <div className='mr-80' />
    </div>
  );
};

export default SidebarDesktop;
