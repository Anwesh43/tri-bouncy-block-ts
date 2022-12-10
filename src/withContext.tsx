import React from 'react'
import { AnimatedScaleProps, DimensionProps, useAnimatedScale, useDimension } from './hooks'
const withContext : (MainComponent : React.FC<any>) => React.FC<any> = (MainComponent : React.FC<any>) : React.FC<any> => {
    return (oldProps : any) => {
        const {w, h} : DimensionProps = useDimension()
        const {scale, start : onClick} : AnimatedScaleProps = useAnimatedScale()
        const newProps = {
            w, 
            h,
            scale, 
            onClick
        }
        const props = {
            ...oldProps,
            ...newProps 
        }
        return (
            <MainComponent {...props}>

            </MainComponent>
        )
    }
}

export default withContext