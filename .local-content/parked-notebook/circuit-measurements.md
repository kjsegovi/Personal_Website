---
title: "Reasoning through a circuit with a meter"
summary: "Using expected voltages, resistor drops, and deliberate faults to make a small circuit easier to understand."
slug: circuit-measurements
topics: [Electronics, Measurements]
state: draft
publishedAt: null
updatedAt: null
---
A circuit diagram gives me a prediction to test. Before moving a probe, I can work out where the voltage should change, which components share a current, and what a broken connection would interrupt.

The starting point for these notes is a small, battery-powered breadboard circuit. This is about low-voltage electronics practice, not mains-powered equipment. The examples below are calculations and diagnostic approaches; they are not measurements from a completed bench session.

## Start with a voltage budget

For a series circuit with a resistor and an LED, the supply voltage is distributed across the components. The LED’s forward voltage depends on the device and operating current, so a value from a simple model is only an estimate.

A useful first check is to measure the supply and the voltage across each component. The drops around the loop should account for the supply, within measurement and connection uncertainty.

If they do not, it is worth checking the probe locations before drawing a conclusion about the component. A breadboard rail break or a lead in the wrong row changes the circuit being measured.

## Current from the resistor drop

A resistor gives a convenient way to estimate current without opening the circuit:

```text
I = voltage across resistor / resistance
```

For a numerical example, a 1.0 V drop across a 1 kΩ resistor implies 1 mA. Those are illustrative values, not a recorded reading. The calculation uses the voltage across the resistor, not the supply voltage across the whole resistor-and-LED circuit.

That distinction is easy to lose when looking at a breadboard. The meter probes define which voltage is being measured. Writing down the two nodes makes the calculation less ambiguous.

Measure resistance with power removed. A meter set up for current measurement must not be placed directly across the battery; that creates a very different connection from a voltage measurement.

## A dark LED leaves several possibilities

The LED might be reversed. A lead might be in a disconnected row. The resistor might not connect where the diagram says it does. There might be an open circuit elsewhere in the loop.

Changing several wires at once can make the LED light without explaining which connection was wrong. A deliberate fault is more useful when the prediction comes first: what should happen to current, and where should voltage appear if this connection opens?

An open circuit can leave a large voltage across a gap while current is approximately zero. Seeing voltage does not by itself establish that current flows. Measuring across the resistor helps distinguish those cases.

## Keep the observation separate from the explanation

A useful bench record keeps these together:

- The intended circuit and the actual breadboard connections.
- The predicted values and assumptions used to calculate them.
- The measured supply and component drops, with units and probe locations.
- The introduced fault and its predicted effect.
- The observations before and after correcting the fault.

Keeping predictions and readings in separate columns makes a disagreement easier to investigate. The explanation can change as the measurements rule out an assumption.

## Adding a load changes the question

A voltage divider is a useful next exercise because the unloaded calculation is straightforward and the load changes it. Once something is connected to the output, that load becomes part of the circuit.

The experiment would compare the unloaded prediction with a calculation that includes the load, then measure both configurations. The aim is to account for the change, rather than treat the divider’s nominal ratio as an output voltage it must always maintain.
