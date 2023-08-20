package com.preproject.server.question.controller;

import com.preproject.server.answer.entity.Answer;
import com.preproject.server.auth.userDetails.LoginMemberIdResolver;
import com.preproject.server.member.entity.Member;
import com.preproject.server.question.dto.*;
import com.preproject.server.question.entity.Question;
import com.preproject.server.question.mapper.QuestionMapper;
import com.preproject.server.question.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;


import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/question") // url 개별 설정
@Validated
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    public QuestionController(QuestionService questionService, QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    /**
     * 엔드포인트에 member-id를 넣었고 @PathVariable에 memberId 추가
     */
    @PostMapping() // 엔드포인트를 답변이랑
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto) {

        // 사용자 정보 조회
        questionPostDto.addEmail(LoginMemberIdResolver.getLoginMemberEmail());

//        // 질문을 등록할 멤버 찾기
//        Member findmember = questionService.findMemberById(memberId);

        Question question = mapper.questionPostDtoToQuestion(questionPostDto);

//        // 회원과 질문을 연결
//        question.setMember(findmember);

        Question response = questionService.createQuestion(question);


        return new ResponseEntity(mapper.questionToQuestionResponseDto(response), HttpStatus.CREATED);

    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@Positive @PathVariable("question-id") long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto) {
        questionPatchDto.setQuestionId(questionId);
        Question question = mapper.questionPatchDtoToQuestion(questionPatchDto);
        Question response = questionService.updateQuestion(question);

        return new ResponseEntity(mapper.questionToQuestionResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@Positive @PathVariable("question-id") long questionId) {
        Question response = questionService.findQuestion(questionId);
        return new ResponseEntity(mapper.questionToQuestionResponseDto(response), HttpStatus.OK);
    }

    // 페이지네이션을 적용하여 조회
    @GetMapping()
    public ResponseEntity getQuestions(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {

        // 페이지는 1부터 시작인데 데이터 액세스 계층에서 접근은 0부터라 page에서 -1
        Page<Question> questionPage = questionService.findQuestions(page - 1, size);
        PageInfo pageInfo = new PageInfo(page, size, (int) questionPage.getTotalElements(), questionPage.getTotalPages());

        List<Question> question = questionPage.getContent();
        List<QuestionResponseDto> response = mapper.questionToQuestionResponseDtos(question);

        return new ResponseEntity<>(new QuestionPageDto(response, pageInfo), HttpStatus.OK);

    }


    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") long questionId) {
        System.out.println(" # delete Question");
        questionService.deleteQuestion(questionId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
