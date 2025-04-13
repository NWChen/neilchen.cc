---
title: Overview of the FIX messaging protocol
slug: fix
date: 2021-09
description: The Financial Information Exchange protocol, in minutes.
tag: note
---

FIX (**F**inancial **I**nformation E**x**change) is a protocol for (financial) securities-related communication. FIX specifies a presentation- and application-layer protocol: it dictates how messages can be encoded, and what their contents can be. In many use cases FIX is like the electronic version of the open outcry and post-it note passing of trading prior to electronification: it handles messaging between traders, exchanges, custodians, clearinghouses, and the other entities involved in securities markets.

Over 10TB of FIX data are generated daily, ranging from security definitions to orders to market data.

## An example

Here's an example of how people use FIX: you, a registered representative at `$INVESTMENT_FIRM`, want to place a trade in `AAPL`. You open a ticket in your trading platform; then you enter a quantity, side, a few other parameters, and hit `SUBMIT`. 

Your trading platform sends a FIX message to `$BROKERDEALER`:

```
8=FIX.4.4 | 9=148 | 35=D | 34=1080 | 49=TESTBUY1 | 52=20180920-18:14:19.508 | 56=TESTSELL1
| 11=63673064027889863415=USD21=2 | 38=7000 | 40=1 | 54=1 | 55=AAPL | 
60=20180920-18:14:19.492 | 10=092 |
```

This is a plaintext ASCII message. Your trading platform sends it over TCP/IP to a FIX server in `$BROKERDEALER`'s server farm in New Jersey. The message encodes all the relevant information about this buy order in tag-value format: a **tag** is a specific field in the FIX schema, and a **value** is whatever value your trading platform assigned to that tag. For example,

* Tag-value pair `35=D` tells `$BROKERDEALER`'s FIX server that the incoming message is a FIX `NewOrderSingle`, or a new order in a single security; application developers might refer to this tag as `MsgType(35)`. 
* Tag-value pair `55=AAPL` (`Symbol(55)`) tells `$BROKERDEALER`'s FIX server that the new order is for symbol `AAPL`.
* Tag-value pair `38=7000` means that this order is for quantity `7000` (shares) of AAPL.
* Tag-value pairs `8=FIX4.4` and `9=148` give the FIX schema version (4.4) and body length, respectively. Body length is the number of characters in the message, including deliimiters and excluding tags `8`, `9`, and `10`.
* Tag-value pair `10-092` is the FIX checksum, which validates and terminates any FIX message. The checksum is the sum of all bytes in the message, mod 256.
* Tag-value pair `34=1080` is the sequence number. Sequence numbers should always be incremented by 1 between messages; a dropped sequence number indicates that messages were missed, in which case some FIX engines will automatically send a `ResendRequest(7)` to ask for the missing message(s).

This message format is sufficient for most use cases. Sometimes, ASCII-encoded and pipe-delimited messages (or XML for that matter) are too heavy. At the presentation-layer there are other ways to encode FIX messages (e.g. [Simple Binary Encoding](https://www.fixtrading.org/standards/sbe-online/#examples)). 

Regardless of encoding, the FIX protocol assumes ordered delivery of messages -- that is, `$BROKERDEALER`'s FIX server assumes it will receive messages in the order that `$INVESTMENT_FIRM`'s trading platform sent them. Ordered delivery (or session failure) is guaranteed by a combination of sequence numbers and `Ack`/`Response` messages.

## Establishing & maintaining a connection

Some things have to happen so that you, registered representative at `$INVESTMENT_FIRM`, can hit `SUBMIT` in trading platform and expect an order to be placed. Sometime early in the morning, your trading platform probably initiated a FIX session with `$BROKERDEALER`'s FIX server by sending a `Logon(A)` message:

```
8=FIX.4.2|9=76|35=A|49=BuySide|56=SellSide|34=1|52=20190605-11:27:06.897|98=0|108=30|141=Y|10=008|
```

![](https://www.onixs.biz/hubfs/fix-dictionary/images/successful-logon.png)

Tag `HeartBtInt(108)` specifies the interval, in seconds, between heartbeat messages. 

## The full trade processing lifecycle

The FIX protocol plays a crucial role throughout the entire trade processing lifecycle, from the initial order placement to the final settlement:

1.  **Order Origination:**
    * The process begins when a trader or an automated trading system decides to place an order.
    * A **New Order - Single (MsgType = D)** message is generated. This message contains all the necessary details of the order, such as the security symbol (Tag 48), side (buy or sell - Tag 54), order quantity (Tag 38), price (Tag 44), order type (e.g., limit, market - Tag 40), and time-in-force (how long the order remains active - Tag 59).
    * This message is sent from the buy-side (e.g., an investment firm) to the sell-side (e.g., a broker) or directly to an exchange or trading venue.

2.  **Order Routing:**
    * Upon receiving the New Order - Single message, the sell-side broker's systems determine the best execution venue for the order based on various factors like price, liquidity, and regulatory requirements.
    * FIX messages are used internally within the broker's infrastructure to route the order to the appropriate exchange or Electronic Communication Network (ECN).
    * Sometimes, a **New Order - Cross (MsgType = s)** or other specialized order messages might be used for specific routing scenarios.

3.  **Order Execution:**
    * When the order reaches the execution venue and a matching counterparty is found, the trade is executed.
    * The execution venue sends an **Execution Report (MsgType = 8)** back to the sell-side broker. This crucial message provides details of the execution, including the fill quantity (Tag 38), average price (Tag 6), last fill price (Tag 31), and execution ID (Tag 17).
    * The sell-side broker, in turn, forwards the Execution Report to the originating buy-side client, keeping them informed of the trade's status. Partial fills may result in multiple Execution Reports.

4.  **Confirmation and Allocation:**
    * Following execution, further FIX messages are used for confirmation and allocation, especially for institutional trades where a single order might be allocated to multiple accounts.
    * **Confirmation (MsgType = AG)** messages are exchanged between the executing broker and the confirming party (often a central matching utility or the buy-side firm itself) to agree on the details of the trade.
    * For allocation, the buy-side firm might send an **Allocation Instruction (MsgType = J)** to the sell-side broker, specifying how the executed quantity should be distributed across different accounts. The broker then responds with an **Allocation Report (MsgType = R)** confirming the allocations.

5.  **Clearing and Settlement:**
    * While FIX is primarily focused on pre-trade and trade execution communication, the information contained within FIX messages is vital for the subsequent clearing and settlement processes.
    * Clearinghouses use the trade details communicated via FIX (often translated into other formats) to match trades and manage post-trade risk.
    * Settlement instructions, detailing how the transfer of funds and securities will occur, are often derived from the information exchanged through FIX during the earlier stages of the lifecycle.

6.  **Post-Trade Reporting:**
    * Even after settlement, FIX can be used for various post-trade reporting purposes.
    * **Trade Capture Report (MsgType = AE)** messages can be used to provide a comprehensive record of executed trades.
    * Regulatory reporting obligations often rely on the data initially communicated through FIX messages.

