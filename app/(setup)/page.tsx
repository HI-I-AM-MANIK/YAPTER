import { getInitialProfile } from "@/lib/initial-profile";
import {db} from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModals } from "@/components/modals/initial-modals";


const SetupPage = async() => {
    const profile = await getInitialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        },
    });

    if (server){
        redirect(`/servers/${server.id}`);
    }

    return <div>
             <InitialModals />
           </div>;
}
 
export default SetupPage;