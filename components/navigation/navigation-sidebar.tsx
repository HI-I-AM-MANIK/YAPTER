import {redirect} from 'next/navigation';
import { currentProfile } from '@/lib/current-profile';
import {db} from '@/lib/db';


const NavigationSidebar = async() => {
    const profile = await currentProfile();
    if(!profile){
        redirect('/login');
    }

    const servers = await db.server.findMany({
        where:{
            members:{
                some:{
                    profileId: profile.id,
                }
            }
        }
    })
    return ( 
        <div className="bg-black  h-full space-y-4 flex flex-col items-center h-full text-primary w-full dark:border-e-gray-900 py-3">
            Navigation Sidebar
        </div>
    );
}
 
export default NavigationSidebar;