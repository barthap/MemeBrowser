import * as React from 'react';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

export interface CameraRollResult {
    images: MediaLibrary.Asset[];
    isLoading: boolean;
    permissionsGranted: boolean;
    doRefresh: () => Promise<void>;
}

export function useCameraRoll(): CameraRollResult {
    // should I consider useReducer() here ???
    const [assets, setAssets] = React.useState<MediaLibrary.Asset[]>([]);
    const [isLoading, setLoading] = React.useState(true);
    const [permissions, setPermissions] = React.useState(true);

    const doRefresh = async () => {
        setLoading(true);

        // check permissions first
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== Permissions.PermissionStatus.GRANTED) {
            setPermissions(false);
            setLoading(false);
            return;
        }

        // load photos
        const result = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.photo
        });
        setAssets(result.assets);
        setLoading(false);
    };

    React.useEffect(() => {
        doRefresh();
    }, []);

    return {
        images: assets,
        isLoading,
        permissionsGranted: permissions,
        doRefresh
    };
}
