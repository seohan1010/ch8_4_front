import { useRouteError } from 'react-router-dom';

import Navigation from '../components/navigation/Navigation';
import PageContent from '../components/PageContent';


const ErrorPage = () => {

    const error = useRouteError();
    
    // let title = 'An error occurred!';
    // let message = 'Something went wrong.';

    // if(error.status === 500){
    //     message = JSON.parse(error.data).message;
    // }

    // if(error.status === 400){
    //     title = 'Not Found!';
    //     message = 'Could not find resource or page.';
    // }


return(

<>
<Navigation />
<PageContent title={'An error occured'}>
<p>{'fetch data has been failed.'}</p>
</PageContent>
</>

)

}

export default ErrorPage;