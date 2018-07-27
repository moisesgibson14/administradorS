import React from 'react'
import Asset from './asset'

const Assets = (props) => (
    <div>
        <div className="flex-sates wrap-legal">
            {
                props.assets.map((asset, index) => (
                        <Asset
                            {...props}
                            key={index}
                            index={index}
                            asset={asset}
                        />

                ))
            }
        </div>
    </div>
)

export default Assets