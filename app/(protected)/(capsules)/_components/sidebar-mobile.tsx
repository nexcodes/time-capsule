import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignLeft } from 'lucide-react';
import SidebarContent from './sidebar-content';

const SidebarMobile = () => {
  return (
    <div className='lg:hidden'>
      <Sheet>
        <SheetTrigger>
          <AlignLeft className='w-8 h-8' />
        </SheetTrigger>
        <SheetContent className='p-2 w-11/12' side='left'>
          <div className='mt-4' />
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SidebarMobile;
