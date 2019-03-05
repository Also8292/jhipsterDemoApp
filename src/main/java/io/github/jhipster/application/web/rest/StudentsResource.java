package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Students;
import io.github.jhipster.application.repository.StudentsRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Students.
 */
@RestController
@RequestMapping("/api")
public class StudentsResource {

    private final Logger log = LoggerFactory.getLogger(StudentsResource.class);

    private static final String ENTITY_NAME = "students";

    private final StudentsRepository studentsRepository;

    public StudentsResource(StudentsRepository studentsRepository) {
        this.studentsRepository = studentsRepository;
    }

    /**
     * POST  /students : Create a new students.
     *
     * @param students the students to create
     * @return the ResponseEntity with status 201 (Created) and with body the new students, or with status 400 (Bad Request) if the students has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/students")
    public ResponseEntity<Students> createStudents(@RequestBody Students students) throws URISyntaxException {
        log.debug("REST request to save Students : {}", students);
        if (students.getId() != null) {
            throw new BadRequestAlertException("A new students cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Students result = studentsRepository.save(students);
        return ResponseEntity.created(new URI("/api/students/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /students : Updates an existing students.
     *
     * @param students the students to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated students,
     * or with status 400 (Bad Request) if the students is not valid,
     * or with status 500 (Internal Server Error) if the students couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/students")
    public ResponseEntity<Students> updateStudents(@RequestBody Students students) throws URISyntaxException {
        log.debug("REST request to update Students : {}", students);
        if (students.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Students result = studentsRepository.save(students);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, students.getId().toString()))
            .body(result);
    }

    /**
     * GET  /students : get all the students.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of students in body
     */
    @GetMapping("/students")
    public List<Students> getAllStudents() {
        log.debug("REST request to get all Students");
        return studentsRepository.findAll();
    }

    /**
     * GET  /students/:id : get the "id" students.
     *
     * @param id the id of the students to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the students, or with status 404 (Not Found)
     */
    @GetMapping("/students/{id}")
    public ResponseEntity<Students> getStudents(@PathVariable Long id) {
        log.debug("REST request to get Students : {}", id);
        Optional<Students> students = studentsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(students);
    }

    /**
     * DELETE  /students/:id : delete the "id" students.
     *
     * @param id the id of the students to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudents(@PathVariable Long id) {
        log.debug("REST request to delete Students : {}", id);
        studentsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
