package io.ylab.soi.app.cognitivemodel.feature.cycle.service;

import io.ylab.soi.app.cognitivemodel.feature.cycle.model.CycleSearchDto;
import io.ylab.soi.app.cognitivemodel.feature.cycle.model.CycleSearchResponse;
import io.ylab.soi.app.cognitivemodel.feature.cycle.mapper.CycleSearchMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CycleSearchServiceImpl implements CycleSearchService {

    private final CycleSearchMapper cycleSearchMapper;

    @Override
    public CycleSearchResponse search(CycleSearchDto cycleSearchDto) {
        List<List<String>> cycles = graphServiceImpl.getCycles();
        List<Character> signs = graphServiceImpl.getSigns(cycles);
        return cycleSearchMapper.map(cycles, signs);
    }
}
// TODO 1. Циклы - название вершин
// TODO 2. Нужно по

// TODO Graph Wrapper
// TODO 1. Cycles
// TODO 2. Sign
// TODO 3. Mapping