const enum TimeUnit {
    Sec = 1000,
    Min = 60 * Sec,
    Hour = 60 * Min,
    Day = 24 * Hour,
    Week = 7 * Day,
    Month = 30.4375 * Day,
    Year = 12 * Month,
}

function toSec   (ms:number) { return Math.round (ms/TimeUnit.Sec)   + " seconds" }
function toMin   (ms:number) { return Math.round (ms/TimeUnit.Min)   + " minutes" }
function toHour  (ms:number) { return Math.round (ms/TimeUnit.Hour)  + " hours" }
function toDay   (ms:number) { return Math.round (ms/TimeUnit.Day)   + " days" }
function toMonth (ms:number) { return Math.round (ms/TimeUnit.Month) + " months" }
function toYear  (ms:number) { return Math.round (ms/TimeUnit.Year)  + " years" }

customElements.define('relative-time', class RelativeTime extends HTMLTimeElement {
    constructor () {
        super ()
        this.makeDateReadable ()
    }

    static get observedAttributes() {
        return ['datetime', 'timezone', 'locale']
    }

    set dateTime (val:string) {
        this.setAttribute ('datetime', val)
    }

    get dateTime () {
        return this.getAttribute('datetime') ?? ''
    }

    private makeDateReadable () {
        const dateTimeAttr = this.getAttribute("datetime")
        if (!dateTimeAttr || dateTimeAttr == "undefined" || dateTimeAttr == "null") {
            this.innerHTML = ""
            return
        }

        const dateTime = new Date (dateTimeAttr)
        if (isNaN(dateTime.getTime())) {
            console.error("Invalid dateTime attribute:", dateTimeAttr)
            this.innerHTML = "Invalid date"
            return
        }

        const timeZone = this.getAttribute("timezone") || undefined
        const locale = this.getAttribute("locale") || undefined

        this.updateInnerText (dateTime)
        this.updateTitle (dateTime, timeZone, locale)
    }
    
    private updateInnerText (dateTime:Date) {
        const now = new Date()
        const dif = dateTime.getTime() - now.getTime()
        const abs = Math.abs (dif)
        const before = dif < 0
        const suffix = before ? " ago" : " hence"

        if (dif == 0) {
            this.innerText = "now"
        } else if (abs < TimeUnit.Min) {
            this.innerText = toSec (abs) + suffix
        } else if (abs < TimeUnit.Hour) {
            this.innerText = toMin (abs) + suffix
        } else if (abs < TimeUnit.Day) {
            this.innerText = toHour (abs) + suffix
        } else if (abs < TimeUnit.Month) {
            this.innerText = toDay (abs) + suffix
        } else if (abs < TimeUnit.Year) {
            this.innerText = toMonth (abs) + suffix
        } else {
            this.innerText = toYear (abs) + suffix
        }

        const nextUpdate = abs < TimeUnit.Min ? TimeUnit.Sec :
                           abs < TimeUnit.Hour ? TimeUnit.Min :
                           abs < TimeUnit.Day ? TimeUnit.Hour :
                           abs < TimeUnit.Month ? TimeUnit.Day :
                           abs < TimeUnit.Year ? TimeUnit.Month : TimeUnit.Year
        setTimeout(() => this.makeDateReadable(), nextUpdate)
    }

    private updateTitle (dateTime:Date, timeZone?:string, locale?:string) {
        try {
            this.title = dateTime.toLocaleString(locale, {dateStyle:"full", timeStyle:"full", timeZone})
        } catch {
            this.title = dateTime.toLocaleString(undefined, {dateStyle:"full", timeStyle:"full"})
        }
    }

    attributeChangedCallback () {
        this.makeDateReadable ()
    }
}, {extends: 'time'})
