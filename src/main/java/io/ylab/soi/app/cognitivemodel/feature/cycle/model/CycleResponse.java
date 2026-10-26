package io.ylab.soi.app.cognitivemodel.feature.cycle.model;

import java.util.List;

public record CycleResponse(
    List<Double> cycle,
    Character sign
) {
}