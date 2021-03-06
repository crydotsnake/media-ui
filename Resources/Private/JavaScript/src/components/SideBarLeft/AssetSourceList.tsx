import * as React from 'react';

import { Headline } from '@neos-project/react-ui-components';

import { useIntl, createUseMediaUiStyles } from '../../core';
import { MediaUiTheme } from '../../interfaces';
import { useSelectAssetSource, useAssetSourcesQuery } from '../../hooks';
import { IconLabel } from '../Presentation';

const useStyles = createUseMediaUiStyles((theme: MediaUiTheme) => ({
    assetSourceList: {
        border: `1px solid ${theme.colors.border}`,
        padding: `0 ${theme.spacing.full}`
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        '& a': {
            fontWeight: 'normal',
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover': {
                color: theme.colors.primary
            }
        }
    },
    itemSelected: {
        '&, .neos.neos-module &': {
            color: theme.colors.primary
        }
    }
}));

export default function AssetSourceList() {
    const classes = useStyles();
    const { assetSources } = useAssetSourcesQuery();
    const { translate } = useIntl();
    const [selectedAssetSource, setSelectedAssetSource] = useSelectAssetSource();

    if (!assetSources?.length) return null;

    return (
        <nav className={classes.assetSourceList}>
            <Headline type="h2">
                <IconLabel icon="box" label={translate('assetSourceList.header', 'Media sources')} />
            </Headline>
            {assetSources?.map(assetSource => (
                <IconLabel
                    key={assetSource.id}
                    label={assetSource.label}
                    iconUri={assetSource.iconUri}
                    className={classes.item}
                >
                    <a
                        className={selectedAssetSource?.id === assetSource.id ? classes.itemSelected : null}
                        onClick={() => setSelectedAssetSource(assetSource)}
                    >
                        {assetSource.id === 'neos' ? translate('assetsource.local', 'Local') : assetSource.label}
                    </a>
                </IconLabel>
            ))}
        </nav>
    );
}
