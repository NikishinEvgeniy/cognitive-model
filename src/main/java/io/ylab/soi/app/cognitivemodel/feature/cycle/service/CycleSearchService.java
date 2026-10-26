package io.ylab.soi.app.cognitivemodel.feature.cycle.service;

import io.ylab.soi.app.cognitivemodel.feature.cycle.model.CycleSearchDto;
import io.ylab.soi.app.cognitivemodel.feature.cycle.model.CycleSearchResponse;

public interface CycleSearchService {
    CycleSearchResponse search(CycleSearchDto cycleSearchDto);
}