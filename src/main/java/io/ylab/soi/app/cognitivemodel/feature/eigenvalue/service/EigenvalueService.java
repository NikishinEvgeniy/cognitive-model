package io.ylab.soi.app.cognitivemodel.feature.eigenvalue.service;

import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model.EigenvalueDto;
import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model.EigenvalueResponse;

public interface EigenvalueService {
    EigenvalueResponse calculate(EigenvalueDto eigenvalue);
}