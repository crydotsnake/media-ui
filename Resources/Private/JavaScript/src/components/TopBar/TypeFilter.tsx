import * as React from 'react';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { SelectBox } from '@neos-project/react-ui-components';

import { createUseMediaUiStyles, useIntl } from '../../core';
import { selectedMediaTypeState } from '../../state';

const useStyles = createUseMediaUiStyles({
    typeFilter: {}
});

interface MediaTypeOptions {
    [type: string]: {
        value: string;
        label: string;
        icon: string;
    };
}

export default function TypeFilter() {
    const classes = useStyles();
    const [mediaTypeFilter, setMediaTypeFilter] = useRecoilState(selectedMediaTypeState);
    const { translate } = useIntl();

    const mediaTypeOptions = useMemo(
        (): MediaTypeOptions => ({
            all: {
                value: '',
                label: translate('typeFilter.mediaType.values.all', 'All'),
                icon: 'photo-video'
            },
            video: {
                value: 'video',
                label: translate('typeFilter.mediaType.values.video', 'Video'),
                icon: 'file-video'
            },
            audio: {
                value: 'audio',
                label: translate('typeFilter.mediaType.values.audio', 'Audio'),
                icon: 'file-audio'
            },
            image: {
                value: 'image',
                label: translate('typeFilter.mediaType.values.image', 'Images'),
                icon: 'file-image'
            },
            // TODO: The Media API currently only knows "Document" internally which is not a valid mimetype
            document: {
                value: 'document',
                label: translate('typeFilter.mediaType.values.document', 'Document'),
                icon: 'file'
            }
        }),
        [translate]
    );

    return (
        <div className={classes.typeFilter}>
            <SelectBox
                options={Object.values(mediaTypeOptions)}
                onValueChange={value => setMediaTypeFilter(value)}
                value={mediaTypeFilter}
                optionValueField="value"
            />
        </div>
    );
}
