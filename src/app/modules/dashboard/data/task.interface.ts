import { IProject } from './project.interface';
import { EStatusTask } from './status-task.enum';

export interface ITask {
  id?: string;
  projectId: IProject['id'];
  description: string;
  status: EStatusTask;
}
