# 10% Off Popup Setup

Use Klaviyo signup forms or a similar Shopify popup app for this flow rather than adding a custom theme popup.

## Shopify

1. Create a dedicated 10% off discount code or automatic discount for popup subscribers.
2. Name it clearly so reporting stays separate from other promotions.

## Klaviyo Form

1. Create a popup signup form for new visitors and non-subscribers.
2. Add `email` as a required field.
3. Add `phone number` as an optional field.
4. If SMS is enabled, keep phone optional and use Klaviyo's consent language for SMS collection.
5. Show the discount code on the success state and send it again in the welcome follow-up.

## Suggested Targeting

1. Trigger after a short delay or modest scroll depth instead of immediately on page load.
2. Suppress the popup for existing subscribers and recent purchasers.
3. Add a cooldown after dismissal so repeat visitors are not spammed.

## Suggested Data Setup

1. Send contacts to the main newsletter list or the list used for new-customer offers.
2. Tag submissions with a source value like `popup-10-off`.
3. Split flows by consent type if phone collection is enabled.
