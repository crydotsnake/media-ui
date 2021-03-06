import GraphQlEntity from './GraphQLEntity';

type AssetSourceType = 'AssetSource';

export default interface AssetSource extends GraphQlEntity {
    __typename: AssetSourceType;
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly iconUri: string;
    readonly readOnly: boolean;
    readonly supportsTagging: boolean;
    readonly supportsCollections: boolean;
}
