"use server"

import { getEntries, type CtaSectionSkeleton } from "@/utils/contentful"

export type CallbackStatus = "idle" | "success" | "invalid" | "error"

export async function requestCallback(_prev: CallbackStatus, formData: FormData): Promise<CallbackStatus> {
    const digits = String(formData.get("phone") ?? "").replace(/\D/g, "")
    const local = digits.startsWith("380") ? digits.slice(2) : digits.startsWith("80") ? digits.slice(1) : digits
    if (!/^0\d{9}$/.test(local)) return "invalid"

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (!token || !chatId) {
        console.error("Telegram is not configured")
        return "error"
    }

    const [cta] = await getEntries<CtaSectionSkeleton>("ctaSection").catch(() => [])
    const { telegramBotMessageFallback = "", phoneCodeFallback = "+38" } = cta?.fields ?? {}

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: `${telegramBotMessageFallback}\n${phoneCodeFallback}${local}`.trim() }),
    }).catch(() => null)

    if (!res?.ok) {
        console.error("Telegram error", await res?.text())
        return "error"
    }
    return "success"
}
