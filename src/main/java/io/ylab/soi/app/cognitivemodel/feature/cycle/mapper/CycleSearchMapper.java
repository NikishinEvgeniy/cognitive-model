package io.ylab.soi.app.cognitivemodel.feature.cycle.mapper;

import io.ylab.soi.app.cognitivemodel.feature.cycle.model.CycleSearchDto;
import io.ylab.soi.app.cognitivemodel.feature.cycle.model.CycleSearchRequest;
import io.ylab.soi.app.cognitivemodel.feature.cycle.model.CycleSearchResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.ERROR,
        componentModel = MappingConstants.ComponentModel.SPRING)
public interface CycleSearchMapper {
    CycleSearchDto map(CycleSearchRequest cycleSearchRequest);
    CycleSearchResponse map(List<List<String>> cycles, List<Character> signed);
}