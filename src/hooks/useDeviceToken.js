import Pushy from 'pushy-react-native';
import { useEffect, useState } from 'react';

export const useDeviceToken = () => {
    const [deviceToken, setDeviceToken] = useState('')
    useEffect(() => {
        Pushy.register().then(async (token) => {
            setDeviceToken(token)
        }).catch((err) => {
            console.error(err);
        });
    }, [])

    console.log("asfasfasfa", deviceToken);
    return { deviceToken };
}