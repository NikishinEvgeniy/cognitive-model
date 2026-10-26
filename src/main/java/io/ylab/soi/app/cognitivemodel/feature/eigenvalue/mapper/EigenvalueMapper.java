package io.ylab.soi.app.cognitivemodel.feature.eigenvalue.mapper;

import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model.EigenvalueDto;
import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model.EigenvalueRequest;
import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model.EigenvalueResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(
        unmappedTargetPolicy = ReportingPolicy.ERROR,
        componentModel = MappingConstants.ComponentModel.SPRING)
public interface EigenvalueMapper {
    EigenvalueDto map(EigenvalueRequest eigenvalueRequest);
    EigenvalueResponse map(double[] eigenvalues);
}