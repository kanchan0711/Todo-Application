import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isSubmitting: boolean = false;
  TodoForm: FormGroup;
  tasks: any[] = [];
  selectedTaskIndex: number = -1;
  EditTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.TodoForm = this.createTaskForm();
    this.EditTaskForm = this.createTaskForm();
    this.loadTasks();
  }

  createTaskForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: [''],
    });
  }

  resetForm() {
    this.TodoForm.reset();
  }

  logout() {
    this.notificationService.showSuccess('Successfully Logged Out');
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.TodoForm.markAllAsTouched();
    if (this.TodoForm.valid) {
      this.isSubmitting = true;
      const formData = this.TodoForm.value;
      this.tasks.push(formData);
      this.saveTasksToLocalStorage();
      this.notificationService.showSuccess('Task added successfully');
      this.TodoForm.reset();
      this.isSubmitting = false;
      this.closeModal('#staticBackdrop');
    }
  }

  submitUpdateForm() {
    this.EditTaskForm.markAllAsTouched();
    if (this.EditTaskForm.valid && this.selectedTaskIndex >= 0) {
      this.isSubmitting = true;
      this.tasks[this.selectedTaskIndex] = this.EditTaskForm.value;
      this.saveTasksToLocalStorage();
      this.notificationService.showSuccess('Task updated successfully');
      this.isSubmitting = false;
      this.selectedTaskIndex = -1;
      this.closeModal('#editTaskModal');
    }
  }

  onDeleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  onEditTask(index: number) {
    this.selectedTaskIndex = index;
    this.EditTaskForm.setValue(this.tasks[index]);
    this.openModal('#editTaskModal');
  }

  private loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private openModal(modalSelector: string) {
    const modal = document.querySelector(modalSelector);
    if (modal) {
      this.renderer.addClass(modal, 'show');
    }
  }

  private closeModal(modalSelector: string) {
    const modal = document.querySelector(modalSelector + ' .btn-close');
    if (modal) {
      modal.dispatchEvent(new MouseEvent('click'));
    }
  }
}
