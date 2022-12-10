import React, {useState, useEffect, CSSProperties} from 'react'

const delay : number = 20 
const scGap : number = 0.01 
const parts : number = 3

export interface DimensionProps {
    w : number, 
    h : number 
}

export interface AnimatedScaleProps {
    scale : number, 
    start : () => void  
}

export const useAnimatedScale = () : AnimatedScaleProps => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) : number => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () : DimensionProps  => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {

        }
    })
    return {
        w, 
        h
    }
}

const maxScale : (a : number, b : number, c : number) => number = 
    (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)

const divideScale : (a : number, b : number, c : number) => number = 
    (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 


export const useStyle = (w : number, h : number, scale : number) => {
    const dsc : (scale : number) => number = (i : number) : number => divideScale(scale, i, parts)
    const size : number = Math.min(w, h) / 10
    return {
        blockStyle() : CSSProperties {
            const position = 'absolute'
            const top = `${h / 2 - (h / 4) * dsc(0) + (h / 4) * dsc(1)}px`
            const left = `${(w / 4) * (dsc(0) + dsc(1)) - (w / 2) * dsc(2)}px`
            const width = `${size}px`
            const height = `${size}px`
            const background = `indigo`
            return {
                position, 
                left, 
                top, 
                width,
                height,
                background
            }
        },
    }
}