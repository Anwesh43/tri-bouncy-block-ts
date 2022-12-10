import React from "react";
import { useStyle } from "./hooks";

interface TriBouncyBlockProps {
    w : number,
    h : number, 
    scale : number, 
    onClick : () => void
}

const TriBouncyBlock = (props : TriBouncyBlockProps) => {
    const {blockStyle} = useStyle(props.w, props.h, props.scale)
    return <div style = {blockStyle()} onClick = {() => props.onClick()}></div>
}

export default TriBouncyBlock 
