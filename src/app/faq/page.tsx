'use client'

import { socketClient } from "@/contexts/socketContext"
import { useEffect } from "react"

export default function FAQPage() {

    const todo = () => {
        if (socketClient.connected) {
            socketClient.emit('foo', { vcn_val: 'vcn 123' })
        }
    }

    useEffect(() => {
        function onConnect() {
            console.log('>>> run this connected')
        }

        function onDisconnect() {
            console.log('>>> run this disconnect')
        }

        function onFooEvent() {
            console.log('>>> run this foo event')
        }

        socketClient.on('connect', onConnect)
        socketClient.on('disconnect', onDisconnect)
        socketClient.on('foo', onFooEvent)

        return () => {
            socketClient.off('connect', onConnect)
            socketClient.off('disconnect', onDisconnect)
            socketClient.off('foo', onFooEvent)
        }
    }, [])

    return (
        <div className="bg-black p-5 box-border">
            <p>FAQ Page</p>

            <button
                onClick={todo}
                className="p-3 m-5 border border-black bg-regular-bg-darkGray-cl"
            >
                socket
            </button>
        </div>
    )
}