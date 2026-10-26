package io.ylab.soi.app.cognitivemodel.feature.cycle.model;

import java.util.List;

public record CycleSearchResponse(
        List<CycleResponse> cycles
) {
}