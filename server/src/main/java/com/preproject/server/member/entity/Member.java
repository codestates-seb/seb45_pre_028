package com.preproject.server.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String password;

    @Column(nullable = false)
    @Size(max = 12)
    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();

//    @OneToMany(mappedBy = "member")
//    private List<Question> Questions = new ArrayList<>();

//      @OneToMany(mappedBy = "member")
//    private List<Answer> answers = new ArrayList<>();

    public enum MemberRole {
        ROLE_USER,
        ROLE_ADMIN
    }
}
