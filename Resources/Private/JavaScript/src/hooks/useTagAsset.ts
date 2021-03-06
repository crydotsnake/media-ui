import { useMutation } from '@apollo/react-hooks';

import { Asset } from '../interfaces';
import { TAG_ASSET } from '../queries';

interface TagAssetProps {
    asset: Asset;
    tagName: string;
}

interface TagAssetVariables {
    id: string;
    assetSourceId: string;
    tag: string;
}

export default function useTagAsset() {
    const [action, { error, data, loading }] = useMutation<{ __typename: string; tagAsset: Asset }, TagAssetVariables>(
        TAG_ASSET
    );

    const tagAsset = ({ asset, tagName }: TagAssetProps) =>
        action({
            variables: {
                id: asset.id,
                assetSourceId: asset.assetSource.id,
                tag: tagName
            },
            optimisticResponse: {
                __typename: 'Mutation',
                tagAsset: {
                    ...asset,
                    tags: [
                        ...asset.tags,
                        {
                            __typename: 'Tag',
                            label: tagName,
                            parent: null,
                            children: []
                        }
                    ]
                }
            }
        });

    return { tagAsset, data, error, loading };
}
