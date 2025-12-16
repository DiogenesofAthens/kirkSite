"use client"

import dynamic from "next/dynamic"
import { LottieComponentProps } from "lottie-react"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export default function LottieClient(props: LottieComponentProps) {
  return <Lottie {...props} />
}
