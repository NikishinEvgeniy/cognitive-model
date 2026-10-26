package io.ylab.soi.app.cognitivemodel.feature.eigenvalue.service;

import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.factory.EigenFactory;
import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.mapper.EigenvalueMapper;
import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model.EigenvalueDto;
import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model.EigenvalueResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.math3.linear.EigenDecomposition;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EigenvalueServiceImpl implements EigenvalueService {

    private final EigenFactory eigenFactory;
    private final EigenvalueMapper eigenvalueMapper;

    @Override
    public EigenvalueResponse calculate(EigenvalueDto eigenvalue) {
        EigenDecomposition decomposition = eigenFactory.create(eigenvalue.matrix());
        double[] eigenvalues = decomposition.getRealEigenvalues();
        return eigenvalueMapper.map(eigenvalues);
    }
}