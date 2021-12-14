Great you’re looking to get involved with Floom. Push your solution to private Git repository and add Ash as a collaborator when you’re ready. Github handle: `ahnunn` `bradlocking` `lukepearce` `richieteo`

## Brief

For this task we’re gonna build a service that tracks the status of Flowers and their stock. Notifying the system on status changes and providing an endpoint for a frontend to access, serving the current status of a given flower stock.

## Flower creation

For simplicity let’s say we have no Flowers to begin with. For the sake of the task we'll simulate a Flower being added to the system by calling an endpoint of your choice with the following data. From this point onwards you store this Flower information how you wish, to be served up.

It’s up to you what statuses your service is capable of declaring for a Flower. If you can produce the logic that generates a given status, then add it to a list of potential statuses an Flower can have. Example statuses are `in_stock` / `low_stock` / `out_of_stock`.

Image urls map to locally stored images

```json
{
    "flowerId": 456,
    "floristId": 123,
    "stockLevel": 7891,
    "tags": [
        "red",
        "romance"
      ],
    "image_urls": [
      "images/orange",
      "images/orange"
    ]
    "storageLocation": [51.5014, 0.1419],
    "status": "in_stock"
}
```

## Flowers / Stock endpoints

- Create an endpoint that serves a List of available Flowers.
- Create an endpoint that serves a Flowers current status and stock when called with the Flowers ID.
- Create an endpoint that updates a Flowers current status and stock when called with the Flowers ID.

## Flowers / Stock Page

Provide a list page that displays all of the available flowers on the system with their current stock and statues.

This page should also allow the user to update the current stock level of each individual flower.

## Filtering

When the page loads we show all our Flowers. The user can then filter down by storage location and/or tags.

## Location

Our users need to be able to see what stock is nearby, they know the latitude and longitude of their location. To see if the flowers are close to hand will  we'll compare their coordinates with the flowers storage location and see if it fits within the allowed 5000unit radius, given in meters.

## Tags

Each flower has some tags that describe it, such as it's color and style. We can offer these in a drop down.

## User notifications

When a Flowers stock level reaches below the threshold of `10` it enters a `low_stock` state, at this point the system should notify a third party stock provider to order new stock

There’s no need to implement the notification delivery itself. Call a pretend endpoint `floom.test/api/send_stock_notification` with parameters `floristId`, `flowerId` and `stockRequired` when you wish to notify the third party of a requirement for new stock.

once this notification is sent we can safely say a corresponding **Stock refill** is created in the `placed` status

## Stock refill status

The possible stock refill statuses of a Flower are `placed` / `en_route` / `delivered` / `unsuccessful`.

These stock updates are provided by the third party stock provider, who will send updates to your endpoint of choice. The coordinates correspond to the drivers location. Updates are sent whenever their location or status changes.

And should finally update the target flower stocks to represent the delivery being completed

Each update from the delivery provider has this structure:

```json
{
    "flowerId":123,
    "amount": 150,
    "coordinates":  [51.5007, 0.1246],
    "deliveryLocation": [51.5014, 0.1419],
    "status": "en_route"
}
```

## Deliverables

Your only framework constraint is that it use React, Node and Typescript. Beyond that you can use any library/database you wish. be prepared to discuss your decisions in depth.
The single page must be built in React. Beyond that you're open to use any frameworks you wish or stay vanilla if you fancy it. We'll discuss your choices in our follow up meeting.

The brief is intentionally open. We don’t wish for you to spend more than two hours on the challenge, elaborate on any area of the challenge you wish, so long as the project has the following features:

- An endpoint that accepts the stock refiill updates
- An endpoint that accepts new flowers
- An endpoint that serves all flowers information
- An endpoint that serves a flowers current status and stock provided with the orders ID.
- An endpoint that update a flowers stock
- a Flower list and edit UI page
- The (pretend) endpoint `floom.test/api/send_stock_notification` is called when you would like to trigger a notification,
