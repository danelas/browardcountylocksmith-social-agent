// The locksmith service catalog. The agent rotates through this list (one per
// run, wrapping around forever) and builds a fresh ad flyer each day:
//   AI generates ONLY the photo background → flyer.ts composites the logo,
//   headline, bullets, CALL NOW bar, and service-area badge on top.
//
// CONTENT MIX: ~70% commercial locksmith + access control (the high-value
// work we want to attract) / ~30% emergency services (lockouts, lost keys —
// keeps visibility for urgent searches). The list is interleaved so roughly
// every 4th post is an emergency topic. 11 commercial + 4 emergency = 73/27.
//
// Captions are intentionally LONG and educational — they explain the service,
// teach the reader something, and work in natural SEO phrases. No short
// generic filler. Never put prices in captions.
//
// ⚠️ Background prompts must say NO text / words / logos / watermarks — all
// text is drawn by the flyer composer, not the AI. Keep the LEFT side of each
// scene darker/uncluttered so the overlaid headline stays readable.

import type { Service } from "../lib/types.ts";

export const BRAND = {
  phone: "954-888-8800",                 // shown on the flyer
  phoneTel: "+19548888800",
  phoneDisplay: "(954) 888-8800",        // shown in captions
  area: process.env.SERVICE_AREA?.trim() || "Broward County & Surrounding Areas",
  tagline: "Residential · Commercial · Automotive",
  promo: "BROWARD25",
  // GBP-only for now. Add "instagram" / "facebook" here once those are
  // connected on the upload-post profile (and set FACEBOOK_PAGE_ID for FB).
  platforms: ["google_business"] as const,
};

const NO_TEXT =
  "Photorealistic, professional advertising photography. No text, no words, no letters, no numbers, no logos, no watermarks, no signage anywhere in the image. Keep the LEFT third of the frame darker and uncluttered (a shadowed wall or plain surface) so text can be overlaid. Clean, modern, high-end commercial look, soft natural lighting.";

export const SERVICES: Service[] = [
  // ── COMMERCIAL / ACCESS CONTROL ──────────────────────────────────────────
  {
    id: "access-control",
    headline: ["Access Control", "Systems"],
    subhead: "Control who enters, where, and when — from one place.",
    bullets: ["Keypad, card & fob readers", "Audit trails & schedules", "Design, install & support"],
    bgPrompt:
      "A sleek modern office entrance with a glass door and a wall-mounted black access control card reader glowing softly, an employee holding a badge near it, corporate lobby background. " + NO_TEXT,
    caption:
      "Still tracking metal keys for every employee? A commercial access control system replaces them with credentials you actually control. Lost fob? Deactivate it in seconds instead of rekeying the building. Need a record of who entered the supply room and when? The audit trail has it. Modern systems let you set door schedules, restrict sensitive areas by role, and manage everything from one dashboard — whether you run a single office or multiple locations. Broward County Locksmith designs, installs, and services access control systems for offices, retail, warehouses, and multi-tenant buildings, and we'll walk your property first so the system fits how your business actually operates.",
    hashtags: ["accesscontrol", "commercialsecurity", "accesscontrolsystems", "businesssecurity", "commerciallocksmith", "browardcounty", "officesecurity"],
  },
  {
    id: "keycard-fob",
    headline: ["Keycard & FOB", "Entry Systems"],
    subhead: "Ditch the key ring. Issue, track & revoke in seconds.",
    bullets: ["Proximity cards & fobs", "Mobile credentials", "Instant deactivation"],
    bgPrompt:
      "A close-up of a hand tapping a key fob against a modern door reader on a commercial glass entrance, subtle indicator light, blurred office interior behind. " + NO_TEXT,
    caption:
      "Here's the hidden cost of traditional keys: every time an employee leaves without returning one, your only secure option is changing the locks. Keycard and fob entry systems solve that permanently. Each person gets their own credential — a card, a fob, or even their phone — and when someone moves on, you deactivate them with a click while everyone else keeps working. You can also see exactly who used which door and when, which matters for inventory rooms, server closets, and after-hours access. We install and program keycard and fob entry systems for businesses of every size, and we can often integrate with the door hardware you already have.",
    hashtags: ["keycardentry", "fobentry", "accesscontrol", "commerciallocksmith", "keylessentry", "businesssecurity", "browardbusiness"],
  },
  {
    id: "commercial-rekey",
    headline: ["Commercial Lock", "Changes & Rekeys"],
    subhead: "Employee turnover? Don't gamble on old keys.",
    bullets: ["Same-day rekeying", "Grade-1 commercial locks", "Key control programs"],
    bgPrompt:
      "A heavy-duty commercial mortise lock and brushed-steel lever handle installed on a professional office door, clean product-photography style, corporate hallway softly blurred behind. " + NO_TEXT,
    caption:
      "When an employee with keys leaves — on good terms or bad — every copy they ever made still works. That's the security gap most businesses ignore until something goes missing. Rekeying changes the internal pins of your existing locks so old keys stop working immediately, usually for far less than full replacement, and it can be done same-day across an entire office or retail space. Where hardware is worn or under-rated, we upgrade to Grade-1 commercial locks built for thousands of cycles a year. Ask us about restricted keyways too: keys stamped 'do not duplicate' are a suggestion, but a restricted key literally can't be copied at a hardware store.",
    hashtags: ["commercialrekey", "lockchange", "commerciallocksmith", "businesssecurity", "rekey", "officesecurity", "keycontrol"],
  },

  // ── EMERGENCY ────────────────────────────────────────────────────────────
  {
    id: "car-lockout",
    headline: ["Locked Out", "Of Your Car?"],
    subhead: "Damage-free entry, wherever you're stuck.",
    bullets: ["Fast mobile response", "No damage to your vehicle", "All makes & models"],
    bgPrompt:
      "A person standing beside a modern sedan in a parking lot at dusk looking through the driver window, keys visible on the seat inside, warm streetlight glow. " + NO_TEXT,
    caption:
      "Keys locked in the car — or worse, in the trunk with the engine running? Don't reach for a coat hanger. Modern vehicles have side-impact airbags, sensitive wiring, and weather seals along the door frame, and DIY entry attempts routinely turn a quick lockout into a body-shop bill. A professional automotive locksmith uses purpose-made tools to open your vehicle without damage, usually in minutes. Broward County Locksmith handles car lockouts for virtually all makes and models — sedans, trucks, EVs — and we come to you: parking garage, office lot, driveway, or roadside. Save our number before you need it; lockouts never happen at a convenient time.",
    hashtags: ["carlockout", "lockedout", "automotivelocksmith", "emergencylocksmith", "locksmithnearme", "browardcounty", "mobilelocksmith"],
  },

  // ── COMMERCIAL / ACCESS CONTROL ──────────────────────────────────────────
  {
    id: "master-key",
    headline: ["Master Key", "Systems"],
    subhead: "One key for you. The right access for everyone else.",
    bullets: ["Custom keying hierarchy", "Restricted key control", "Scales as you grow"],
    bgPrompt:
      "A row of labeled brass keys hanging on an organized key-control board with one distinct master key in sharp focus in the foreground, professional office backdrop. " + NO_TEXT,
    caption:
      "A well-designed master key system is an organizational chart in metal. The owner carries one key that opens everything. The office manager's key opens the front door and the supply room — but not the server closet. Each tenant or department opens only their own space. Done right, it eliminates the giant key ring, simplifies onboarding, and means that when one key goes missing you rekey one level of the system, not the whole building. We design and install master key systems for offices, retail plazas, medical suites, and multi-tenant properties, including restricted keyways so copies can't be cut without your written authorization. If your current 'system' is a drawer full of unlabeled keys, it's time to talk.",
    hashtags: ["masterkey", "masterkeysystem", "commerciallocksmith", "keycontrol", "propertymanagement", "businesssecurity", "accesscontrol"],
  },
  {
    id: "panic-bars",
    headline: ["Panic Bars &", "Exit Devices"],
    subhead: "Code-compliant egress that still keeps intruders out.",
    bullets: ["Push-bar installation & repair", "Fire & life-safety codes", "Alarmed exit options"],
    bgPrompt:
      "A commercial steel back door with a sturdy horizontal push bar exit device, clean warehouse corridor lighting, professional industrial setting. " + NO_TEXT,
    caption:
      "Panic bars aren't optional hardware — on most commercial occupancies, fire and life-safety codes require single-motion egress so people can get out in an emergency even in the dark, with their hands full, or in a crowd. But a failing exit device cuts both ways: it can trap occupants during an inspection-failing emergency, or swing the other direction and leave your back door effectively unlocked all night. We install, repair, and replace panic bars and exit devices, set up alarmed versions that deter employees from propping doors, and pair them with outside trim so staff can still enter with a key or credential. If your push bar sticks, sags, or needs a hip-check to latch, get it serviced before the fire marshal — or a burglar — finds it first.",
    hashtags: ["panicbar", "exitdevice", "commercialdoors", "firecode", "lifesafety", "commerciallocksmith", "businesssecurity"],
  },
  {
    id: "door-closers",
    headline: ["Commercial", "Door Closers"],
    subhead: "Slamming or sagging doors are a security & safety problem.",
    bullets: ["Closer install & adjustment", "ADA-compliant settings", "All grades & sizes"],
    bgPrompt:
      "A professional adjusting a hydraulic door closer at the top of a commercial glass office door with a screwdriver, bright modern building entrance. " + NO_TEXT,
    caption:
      "That office door that slams like a thunderclap — or drifts shut so slowly it never actually latches — is a door closer problem, and it's costing you more than annoyance. A door that doesn't fully latch isn't locked, no matter how good the lock is. A door that slams wears out hinges, cracks glass, and can fail ADA opening-force requirements. Most closers just need professional adjustment of their closing and latching speed; worn ones need replacement matched to the door's weight, width, and traffic. We install, adjust, and replace commercial door closers of every grade, set them to ADA-compliant force, and make sure every door on your property closes — and locks — the way it should.",
    hashtags: ["doorcloser", "commercialdoors", "doorhardware", "ADAcompliance", "commerciallocksmith", "facilitymanagement", "officesecurity"],
  },

  // ── EMERGENCY ────────────────────────────────────────────────────────────
  {
    id: "residential-lockout",
    headline: ["Locked Out", "Of Your Home?"],
    subhead: "Fast, damage-free entry — day or night.",
    bullets: ["24/7 emergency response", "No damage to your door", "Spare keys cut on-site"],
    bgPrompt:
      "A residential front door at dusk with warm porch light, a locksmith kneeling to work on the door handle, calm and reassuring mood. " + NO_TEXT,
    caption:
      "Locked out of the house? Before you climb through a window or try to force the door, know this: most residential lockouts can be opened cleanly by a professional in minutes, with zero damage to your lock or frame. Kicked-in doors and broken windows cost hundreds to repair and leave your home unsecured until they're fixed. We respond around the clock, verify you're the resident, open the door without damage, and can cut spare keys on the spot — or rekey the lock entirely if your keys were lost somewhere they could be traced back to your address. That last part matters more than most people realize: lost keys plus anything with your address on it means rekey, not just re-entry.",
    hashtags: ["houselockout", "lockedout", "emergencylocksmith", "247locksmith", "residentiallocksmith", "locksmithnearme", "browardcounty"],
  },

  // ── COMMERCIAL / ACCESS CONTROL ──────────────────────────────────────────
  {
    id: "storefront-doors",
    headline: ["Storefront Door", "Repair & Adjustment"],
    subhead: "Your front door is your first impression — and first defense.",
    bullets: ["Aluminum door specialists", "Pivots, hinges & locks", "Misalignment fixed fast"],
    bgPrompt:
      "A modern retail storefront with full-glass aluminum-frame doors, clean sidewalk, attractive shop entrance in daylight, professional commercial photography. " + NO_TEXT,
    caption:
      "Aluminum storefront doors take a beating — hundreds of open-close cycles a day, every day. Eventually the pivots wear, the door drops, the hookbolt stops lining up with the strike, and your staff starts doing the lift-and-slam ritual just to lock up at night. Left alone, a misaligned storefront door damages its own frame, fails to latch (read: unlocked all night), and tells every passing burglar the maintenance is behind. We specialize in storefront door repair: pivots and hinges, commercial deadlatches and hookbolt locks, push-pull hardware, closer adjustment, and realignment — usually same visit. If your front door grinds, drags, or needs a shoulder to close, have it fixed before it becomes a replacement.",
    hashtags: ["storefrontdoor", "doorrepair", "commercialdoors", "retailsecurity", "commerciallocksmith", "storefrontrepair", "smallbusiness"],
  },
  {
    id: "electric-strikes",
    headline: ["Electric Strikes", "& Mag Locks"],
    subhead: "Buzz-in entry and fail-safe locking, wired right.",
    bullets: ["Buzz-in & remote release", "Fail-safe / fail-secure", "Intercom & video integration"],
    bgPrompt:
      "A commercial door frame with a sleek electric strike and a magnetic lock mounted at the top of a glass office door, modern lobby, subtle technology aesthetic. " + NO_TEXT,
    caption:
      "Want the receptionist to buzz visitors in? Need a lobby door that locks automatically but releases instantly during a fire alarm? That's electric strike and maglock territory — and choosing between them is where businesses get it wrong. An electric strike releases the latch and works with your existing lockset; a magnetic lock holds the door with sheer force and needs a code-compliant release path (motion sensor, push-to-exit, fire-alarm tie-in) to be legal. Fail-safe vs. fail-secure matters too: one unlocks when power drops, the other stays locked. We install and wire electric strikes and mag locks correctly, integrate them with intercoms, video doorbells, and access control, and make sure the result passes inspection instead of failing it.",
    hashtags: ["electricstrike", "maglock", "accesscontrol", "buzzinentry", "commercialsecurity", "commerciallocksmith", "officesecurity"],
  },
  {
    id: "security-upgrades",
    headline: ["Office & Retail", "Security Upgrades"],
    subhead: "Find the weak point before someone else does.",
    bullets: ["On-site security assessment", "High-security locks & cylinders", "Layered, budget-aware plans"],
    bgPrompt:
      "A modern office reception area at evening with a professional inspecting the glass entrance door lock, clipboard nearby on a desk, upscale corporate environment. " + NO_TEXT,
    caption:
      "Most break-ins aren't sophisticated — they exploit one weak point: a back door with a worn latch, a key that half the former staff still has, glass beside a thumbturn deadbolt, a gate lock that's been 'temporarily' chained for a year. A professional security upgrade starts with walking the property the way an intruder would. From there we layer fixes by priority: high-security cylinders that resist picking and bumping, reinforced strikes that stop kick-ins, restricted keys that can't be copied, and access control where keys no longer make sense. Broward County Locksmith does on-site security assessments for offices, retail, and warehouses and gives you a prioritized plan — not a one-size-fits-all upsell.",
    hashtags: ["securityupgrade", "businesssecurity", "highsecuritylocks", "commerciallocksmith", "retailsecurity", "officesecurity", "securityaudit"],
  },

  // ── EMERGENCY ────────────────────────────────────────────────────────────
  {
    id: "commercial-lockout",
    headline: ["Commercial", "Lockout Service"],
    subhead: "Locked out of the business? Every minute is money.",
    bullets: ["Priority business response", "Offices, retail & warehouses", "Damage-free professional entry"],
    bgPrompt:
      "A business owner standing at a locked modern office building glass entrance early in the morning, briefcase in hand, city street softly lit behind. " + NO_TEXT,
    caption:
      "A commercial lockout isn't just an inconvenience — it's employees standing in the parking lot, deliveries missed, and customers walking to a competitor. It happens more ways than you'd think: the only keyholder is on vacation, a manager left with the keys, a high-traffic lock finally jams, or an electronic lock's battery dies at 7 a.m. We prioritize business lockouts and open commercial doors damage-free — mortise locks, storefront deadlatches, high-security cylinders, and electronic hardware included. While we're there, we can cut backup keys, rekey if a key walked off with a former employee, and fix whatever caused the failure so it doesn't repeat next quarter. One call gets you back to business.",
    hashtags: ["commerciallockout", "businesslockout", "emergencylocksmith", "commerciallocksmith", "lockedout", "browardbusiness", "locksmithnearme"],
  },

  // ── COMMERCIAL / ACCESS CONTROL ──────────────────────────────────────────
  {
    id: "door-hardware",
    headline: ["Door Hardware", "Install & Repair"],
    subhead: "Locks, hinges, pivots, levers — the parts that fail first.",
    bullets: ["Mortise & cylindrical locks", "Continuous hinges & pivots", "ADA lever upgrades"],
    bgPrompt:
      "An organized workbench with premium commercial door hardware including a mortise lock body, lever handles, and a continuous hinge, beside a partially serviced office door, professional workshop lighting. " + NO_TEXT,
    caption:
      "Commercial doors live a hard life, and the hardware always fails before the door does. A lever that flops, a latch you have to jiggle, a hinge that screeches, a back door that bounces open in the wind — each one is a small failure that compounds into a security hole and, eventually, a door replacement. We install and repair the full range of commercial door hardware: mortise and cylindrical locksets, deadbolts and deadlatches, continuous hinges and pivots for heavy or high-traffic doors, kick plates, flush bolts, and ADA-compliant lever upgrades. Matching the right grade of hardware to a door's traffic is the difference between replacing parts every year and forgetting about that door for a decade. We help you buy once.",
    hashtags: ["doorhardware", "commercialdoors", "mortiselock", "doorrepair", "commerciallocksmith", "facilitymaintenance", "ADAcompliance"],
  },
  {
    id: "property-management",
    headline: ["Property Management", "Security Solutions"],
    subhead: "One locksmith partner for every door you manage.",
    bullets: ["Multi-unit key systems", "Tenant turnover rekeys", "Scheduled maintenance plans"],
    bgPrompt:
      "A modern multi-tenant commercial building exterior with a row of identical suite entrances along a clean breezeway, professional real estate photography, late afternoon light. " + NO_TEXT,
    caption:
      "If you manage properties, locks are a recurring line item, not a one-time fix: every move-out is a rekey, every common door takes constant traffic, and every contractor, cleaner, and leasing agent needs the right access without getting the master. The fix is structural — a properly designed master key system with restricted keyways, mailbox and common-area hardware standardized across units, access control on amenity spaces, and a locksmith partner who keeps records of what's keyed how. Broward County Locksmith works with property managers and landlords on multi-unit buildings, HOAs, and commercial plazas: turnover rekeys on your schedule, emergency response for tenant lockouts, and maintenance plans that catch failing closers and exit devices before tenants complain. One call, every door, documented.",
    hashtags: ["propertymanagement", "propertymanager", "masterkeysystem", "tenantturnover", "commerciallocksmith", "HOAmanagement", "multifamily"],
  },

  // ── EMERGENCY ────────────────────────────────────────────────────────────
  {
    id: "lost-car-keys",
    headline: ["Lost Car Keys &", "Key Programming"],
    subhead: "All keys lost? We make new ones on-site — no tow needed.",
    bullets: ["Keys cut & programmed on-site", "Transponders, fobs & smart keys", "Most makes & models"],
    bgPrompt:
      "A locksmith's mobile work station beside an open car door, a key-cutting machine and a fresh modern car key fob in focus, driveway setting, golden hour light. " + NO_TEXT,
    caption:
      "Lost every key to your car? The dealership route usually means towing the vehicle, ordering a key, and waiting days. A mobile automotive locksmith flips that: we come to your car, cut a new key from the vehicle itself, and program the transponder or smart fob on the spot — same day in most cases. This works even when you have zero working keys, because the immobilizer is programmed directly through the car's diagnostic port. We handle transponder keys, remote fobs, push-to-start smart keys, and laser-cut high-security keys for most makes and models. Pro tip: get a spare made while you still have one working key — it's significantly simpler than an all-keys-lost job, and it means you'll never need this post.",
    hashtags: ["lostcarkeys", "carkeyreplacement", "keyfobprogramming", "transponderkey", "automotivelocksmith", "carkeysmadenearme", "mobilelocksmith"],
  },
];
